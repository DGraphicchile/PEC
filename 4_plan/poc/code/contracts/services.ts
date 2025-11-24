import type { ResolvedFramework } from '#contracts/normativa'

export interface FrameworkResolverService {
  resolveByDate(businessDate: Date): Promise<ResolvedFramework>;
  resolveById(frameworkId: string): Promise<ResolvedFramework>;
}
