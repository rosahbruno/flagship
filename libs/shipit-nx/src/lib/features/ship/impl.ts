import type { ExecutorContext } from '@nrwl/devkit';
import { createProjectGraphAsync } from 'nx/src/project-graph/project-graph';

import { ShipConfig } from '../../configs/ship.config';
import {
  CleanPhase,
  ClonePhase,
  CorruptionCheckPhase,
  PostProcessPhase,
  PushPhase,
  SyncPhase,
  VerifyRepoPhase,
  runPhases,
} from '../../phases';
import { findDependencies } from '../../utils/find-dependencies.util';
import { findDependents } from '../../utils/find-dependents.util';
import { findProjectNames } from '../../utils/find-project-names.util';

export interface ShipExecutorOptions {
  repo: string;
  branch: string;
  maxWarnings?: number;
  dryRun?: boolean;
}

export const shipIt = async (options: ShipExecutorOptions, context: ExecutorContext) => {
  const projectGraph = await createProjectGraphAsync();

  const config = new ShipConfig({
    sourcePath: context.root,
    maxWarnings: options.maxWarnings,
    destinationRepoURL: options.repo,
    destinationBranch: options.branch,
    ...(context.projectName && context.projectName !== 'workspace'
      ? {
          project: context.projectName,
          projectRoot: context.workspace.projects[context.projectName]?.root,
          dependencies: await findDependencies(projectGraph, context.projectName),
          dependents: await findDependents(projectGraph, context.projectName),
          workspace: await findProjectNames(context.workspace.projects),
        }
      : {}),
  });

  return runPhases(
    [
      ClonePhase,
      CorruptionCheckPhase,
      CleanPhase,
      SyncPhase,
      VerifyRepoPhase,
      PostProcessPhase,
      ...(options.dryRun ? [] : [PushPhase]),
    ],
    config
  )
    .then(() => ({ success: true }))
    .catch(() => ({ success: false }));
};

export default shipIt;
