import { QueryClient } from "@tanstack/react-query";
import { createRouter } from "@tanstack/react-router";
import { routeTree } from "./routeTree.gen";

export const getRouter = () => {
  const queryClient = new QueryClient({
    defaultOptions: { queries: { staleTime: 30_000, refetchOnWindowFocus: false } },
  });
  const router = createRouter({
    routeTree,
    context: { queryClient },
    scrollRestoration: true,
    // Fetch a route's code when a link is hovered or focused, so the click is instant.
    defaultPreload: "intent",
    defaultPreloadStaleTime: 0,
  });
  return router;
};
