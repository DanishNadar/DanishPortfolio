import { useLayoutEffect } from "react";

const CARD_SELECTOR = [
  ".project-card-grid > *",
  ".post-card-link",
  ".friend-profile-card",
  ".friend-hero-card",
  ".friend-group-card",
  ".friend-community-card",
  ".skill-context-card",
  ".stack-summary-card",
  ".ambient-card",
  ".about-scroll-item",
  ".about-timeline-item",
  ".readable-panel > *",
  "article.premium-border",
  "a.premium-border",
].join(",");

const PAGE_ENTRANCE_DELAY_MS = 0;

function collectCards(node: Node) {
  if (!(node instanceof Element)) return [];

  const cards: Element[] = [];
  if (node.matches(CARD_SELECTOR)) cards.push(node);
  cards.push(...node.querySelectorAll(CARD_SELECTOR));
  return cards;
}

export function CardEntranceObserver() {
  useLayoutEffect(() => {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const registered = new WeakSet<Element>();
    const cleanupTimers = new Set<number>();

    const reveal = (element: Element) => {
      element.classList.remove("card-enter-pending");
      element.classList.add("card-enter-visible");
      const delay = Number.parseInt(
        (element as HTMLElement).style.getPropertyValue("--card-enter-delay"),
        10,
      );
      const cleanupTimer = window.setTimeout(
        () => {
          element.classList.remove("card-enter", "card-enter-visible");
          (element as HTMLElement).style.removeProperty("--card-enter-delay");
          cleanupTimers.delete(cleanupTimer);
        },
        (Number.isFinite(delay) ? delay : 0) + 720,
      );
      cleanupTimers.add(cleanupTimer);
    };

    const intersectionObserver = reduceMotion
      ? null
      : new IntersectionObserver(
          (entries) => {
            entries.forEach((entry) => {
              if (!entry.isIntersecting) return;
              reveal(entry.target);
              intersectionObserver?.unobserve(entry.target);
            });
          },
          { rootMargin: "0px 0px -7% 0px", threshold: 0.08 },
        );

    const registerCards = (cards: Element[]) => {
      let staggerIndex = 0;

      cards.forEach((element) => {
        if (
          registered.has(element) ||
          element.closest("[data-card-entrance='off']") ||
          element.closest(".home-story-page")
        ) {
          return;
        }
        registered.add(element);

        if (reduceMotion) return;

        element.classList.add("card-enter", "card-enter-pending");
        (element as HTMLElement).style.setProperty(
          "--card-enter-delay",
          `${Math.min(staggerIndex, 7) * 55}ms`,
        );
        staggerIndex += 1;

        const observeTimer = window.setTimeout(() => {
          if (element.isConnected) intersectionObserver?.observe(element);
          cleanupTimers.delete(observeTimer);
        }, PAGE_ENTRANCE_DELAY_MS);
        cleanupTimers.add(observeTimer);
      });
    };

    registerCards([...document.querySelectorAll(CARD_SELECTOR)]);

    const mutationObserver = new MutationObserver((mutations) => {
      const newCards = mutations.flatMap((mutation) =>
        [...mutation.addedNodes].flatMap(collectCards),
      );
      if (newCards.length > 0) registerCards(newCards);
    });

    mutationObserver.observe(document.body, { childList: true, subtree: true });

    return () => {
      mutationObserver.disconnect();
      intersectionObserver?.disconnect();
      cleanupTimers.forEach((timer) => window.clearTimeout(timer));
      cleanupTimers.clear();
    };
  }, []);

  return null;
}
