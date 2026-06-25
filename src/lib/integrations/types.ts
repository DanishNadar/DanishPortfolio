export interface IntegrationStatus {
  provider: string;
  displayName: string;
  purpose: string;
  enabled: boolean;
  requiredEnv: string[];
  optionalEnv?: string[];
  notes?: string;
}

export interface IntegrationAdapter {
  provider: string;
  displayName: string;
  purpose: string;
  requiredEnv: string[];
  optionalEnv?: string[];
  /** Synchronous client-side check  -  true if envs are present (best-effort) */
  isEnabledClient: () => boolean;
  /** Returns a static descriptor; runtime testConnection should live in a server fn */
  describe: () => IntegrationStatus;
}

export function makeAdapter(spec: Omit<IntegrationAdapter, "describe" | "isEnabledClient"> & {
  isEnabledClient?: () => boolean;
}): IntegrationAdapter {
  const isEnabledClient = spec.isEnabledClient ?? (() => false);
  return {
    ...spec,
    isEnabledClient,
    describe: () => ({
      provider: spec.provider,
      displayName: spec.displayName,
      purpose: spec.purpose,
      enabled: isEnabledClient(),
      requiredEnv: spec.requiredEnv,
      optionalEnv: spec.optionalEnv,
    }),
  };
}
