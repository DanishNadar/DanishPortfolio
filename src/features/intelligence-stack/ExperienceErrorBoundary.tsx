import { Component, type ErrorInfo, type ReactNode } from "react";

interface ExperienceErrorBoundaryProps {
  children: ReactNode;
  fallback: ReactNode;
}

interface ExperienceErrorBoundaryState {
  hasError: boolean;
}

export class ExperienceErrorBoundary extends Component<
  ExperienceErrorBoundaryProps,
  ExperienceErrorBoundaryState
> {
  state: ExperienceErrorBoundaryState = { hasError: false };

  static getDerivedStateFromError(): ExperienceErrorBoundaryState {
    return { hasError: true };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error("Intelligence Stack scene failed to render.", error, info);
  }

  render() {
    return this.state.hasError ? this.props.fallback : this.props.children;
  }
}
