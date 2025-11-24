export interface NormativeArtifact {
  id: string;
  version: string;
  content: Record<string, any>;
}

export interface ResolvedFramework {
  id: string;
  name: string;
  parameters: NormativeArtifact;
  directive: NormativeArtifact;
}
