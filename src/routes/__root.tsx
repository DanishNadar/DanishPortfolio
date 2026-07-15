import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  createRootRouteWithContext,
  HeadContent,
  Scripts,
  Link,
  useRouterState,
} from "@tanstack/react-router";
import { lazy, Suspense } from "react";
import appCss from "../styles.css?url";
import { SiteNav } from "@/components/SiteNav";
import { SiteFooter } from "@/components/SiteFooter";
import { AnimatedBackground } from "@/components/AnimatedBackground";
import { BackToTop } from "@/components/BackToTop";
import { PointerGlow } from "@/components/PointerGlow";
import { ImageLightboxProvider } from "@/components/ImageLightbox";

const FloatingAvatar = lazy(() =>
  import("@/components/FloatingAvatar").then((mod) => ({ default: mod.FloatingAvatar })),
);

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Danish Nadar  -  AI Engineer · Robotics · Autonomy" },
      {
        name: "description",
        content:
          "AI engineer building robotics, autonomy, and intelligent products from idea to working prototype.",
      },
      { property: "og:title", content: "Danish Nadar  -  AI Engineer" },
      { property: "og:description", content: "AI · Robotics · Autonomy · Security automation." },
      { property: "og:type", content: "website" },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Goldman:wght@400;700&family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@400;600&family=Orbitron:wght@500;600;700;800&family=Science+Gothic:wght@400;500;600;700;800;900&family=Zen+Dots&display=swap",
      },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: () => (
    <div className="min-h-screen grid place-items-center px-6">
      <div className="text-center">
        <div className="text-8xl font-display font-bold text-gradient-rb">404</div>
        <p className="mt-4 text-muted-foreground">This page drifted out of the lane.</p>
        <Link
          to="/"
          className="mt-6 inline-block px-5 py-2 rounded-lg bg-gradient-rb text-background font-semibold"
        >
          Back home
        </Link>
      </div>
    </div>
  ),
  errorComponent: ({ error }) => (
    <div className="min-h-screen grid place-items-center px-6 text-center">
      <div>
        <h1 className="text-2xl font-display">Something broke</h1>
        <p className="mt-2 text-sm text-muted-foreground">{error.message}</p>
        <a href="/" className="mt-4 inline-block underline">
          Go home
        </a>
      </div>
    </div>
  ),
});

function RootShell({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();
  const pathname = useRouterState({ select: (state) => state.location.pathname });
  const backgroundTestMode = pathname === "/test";
  const immersiveMode = pathname === "/intelligence-stack";

  return (
    <QueryClientProvider client={queryClient}>
      <ImageLightboxProvider>
        {!immersiveMode && <AnimatedBackground testMode={backgroundTestMode} />}
        {backgroundTestMode ? (
          <Outlet />
        ) : immersiveMode ? (
          <Outlet />
        ) : (
          <>
            <PointerGlow />
            <SiteNav />
            <main className="min-h-[calc(100vh-4rem)]">
              <Outlet />
            </main>
            <SiteFooter />
            <Suspense fallback={null}>
              <FloatingAvatar />
            </Suspense>
            <BackToTop />
          </>
        )}
      </ImageLightboxProvider>
    </QueryClientProvider>
  );
}
