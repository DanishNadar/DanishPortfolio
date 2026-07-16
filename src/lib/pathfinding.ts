export type PathNode = {
  id: number;
  x: number;
  y: number;
};

export type PathEdge = {
  id: string;
  from: number;
  to: number;
  weight: number;
};

export type PathSearchStep = {
  nodeId: number;
  g: number;
  h: number;
  f: number;
  testedEdgeIds: string[];
};

export type PathfindingProblem = {
  id: number;
  algorithm: "A*";
  nodes: PathNode[];
  edges: PathEdge[];
  explored: number[];
  searchSteps: PathSearchStep[];
  path: number[];
  distance: number;
  heuristicEstimate: number;
  estimatedTotal: number;
};

function randomBetween(min: number, max: number) {
  return min + Math.random() * (max - min);
}

export function createPathfindingProblem(): PathfindingProblem {
  const nodes: PathNode[] = [
    { id: 0, x: 35, y: randomBetween(180, 420) },
    ...Array.from({ length: 4 }, (_, column) =>
      Array.from({ length: 4 }, (_, row) => ({
        id: 1 + column * 4 + row,
        x: 205 + column * 190 + randomBetween(-24, 24),
        y: 85 + row * 140 + randomBetween(-38, 38),
      })),
    ).flat(),
    { id: 17, x: 965, y: randomBetween(180, 420) },
  ];
  const edgeMap = new Map<string, PathEdge>();

  const addEdge = (from: number, to: number, trafficFactor = randomBetween(0.92, 1.28)) => {
    const [start, end] = from < to ? [from, to] : [to, from];
    const id = `${start}-${end}`;
    if (edgeMap.has(id)) return;

    const a = nodes[start];
    const b = nodes[end];
    edgeMap.set(id, {
      id,
      from: start,
      to: end,
      weight: Math.hypot(a.x - b.x, a.y - b.y) * trafficFactor,
    });
  };

  for (let row = 0; row < 4; row += 1) addEdge(0, 1 + row);

  for (let column = 0; column < 3; column += 1) {
    const currentStart = 1 + column * 4;
    const nextStart = currentStart + 4;

    for (let row = 0; row < 4; row += 1) {
      const current = nodes[currentStart + row];
      const nearest = Array.from({ length: 4 }, (_, nextRow) => nextStart + nextRow)
        .sort(
          (left, right) =>
            Math.abs(nodes[left].y - current.y) - Math.abs(nodes[right].y - current.y),
        )
        .slice(0, 2);

      nearest.forEach((next) => addEdge(current.id, next));
      if (Math.random() > 0.56) addEdge(current.id, nextStart + Math.floor(Math.random() * 4));
    }
  }

  for (let row = 0; row < 4; row += 1) addEdge(13 + row, 17);

  const edges = [...edgeMap.values()];
  const adjacency = new Map<number, Array<{ node: number; weight: number }>>();
  nodes.forEach((node) => adjacency.set(node.id, []));
  edges.forEach((edge) => {
    adjacency.get(edge.from)?.push({ node: edge.to, weight: edge.weight });
    adjacency.get(edge.to)?.push({ node: edge.from, weight: edge.weight });
  });

  const startId = 0;
  const goalId = 17;
  const goal = nodes[goalId];
  const heuristic = (nodeId: number) => {
    const node = nodes[nodeId];
    return Math.hypot(node.x - goal.x, node.y - goal.y);
  };

  const gScore = new Map(nodes.map((node) => [node.id, Number.POSITIVE_INFINITY]));
  const fScore = new Map(nodes.map((node) => [node.id, Number.POSITIVE_INFINITY]));
  const previous = new Map<number, number>();
  const openSet = new Set([startId]);
  const closedSet = new Set<number>();
  const explored: number[] = [];
  const searchSteps: PathSearchStep[] = [];
  gScore.set(startId, 0);
  fScore.set(startId, heuristic(startId));

  while (openSet.size > 0) {
    const current = [...openSet].reduce((best, candidate) =>
      (fScore.get(candidate) ?? Infinity) < (fScore.get(best) ?? Infinity) ? candidate : best,
    );
    openSet.delete(current);
    closedSet.add(current);
    explored.push(current);
    if (current === goalId) break;

    const testedEdgeIds: string[] = [];

    for (const neighbor of adjacency.get(current) ?? []) {
      if (closedSet.has(neighbor.node)) continue;
      const edgeId =
        current < neighbor.node ? `${current}-${neighbor.node}` : `${neighbor.node}-${current}`;
      testedEdgeIds.push(edgeId);
      const candidateDistance = (gScore.get(current) ?? Infinity) + neighbor.weight;
      if (candidateDistance < (gScore.get(neighbor.node) ?? Infinity)) {
        previous.set(neighbor.node, current);
        gScore.set(neighbor.node, candidateDistance);
        fScore.set(neighbor.node, candidateDistance + heuristic(neighbor.node));
        openSet.add(neighbor.node);
      }
    }

    const currentG = gScore.get(current) ?? 0;
    const currentH = heuristic(current);
    searchSteps.push({
      nodeId: current,
      g: Math.round(currentG),
      h: Math.round(currentH),
      f: Math.round(currentG + currentH),
      testedEdgeIds,
    });
  }

  const path = [goalId];
  while (path[0] !== startId) {
    const predecessor = previous.get(path[0]);
    if (predecessor === undefined) {
      throw new Error("Generated A* graph does not connect start to destination.");
    }
    path.unshift(predecessor);
  }

  return {
    id: Date.now() + Math.floor(Math.random() * 1000),
    algorithm: "A*",
    nodes,
    edges,
    explored,
    searchSteps,
    path,
    distance: Math.round(gScore.get(goalId) ?? 0),
    heuristicEstimate: Math.round(heuristic(startId)),
    estimatedTotal: Math.round(fScore.get(goalId) ?? gScore.get(goalId) ?? 0),
  };
}

export function validatePathfindingProblem(problem: PathfindingProblem) {
  if (problem.path[0] !== 0) return false;
  if (problem.path.at(-1) !== 17) return false;

  const edgeIds = new Set(problem.edges.map((edge) => edge.id));
  return problem.path.slice(1).every((nodeId, index) => {
    const previousNode = problem.path[index];
    const edgeId =
      previousNode < nodeId ? `${previousNode}-${nodeId}` : `${nodeId}-${previousNode}`;
    return edgeIds.has(edgeId);
  });
}
