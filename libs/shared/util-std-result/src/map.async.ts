import type { MaybePromise } from '@brandingbrand/standard-types';

import type { Result } from './result';
import { fail, isFailure, isOk, ok } from './result';

export const mapOkAsync =
  <InputOkType, OutputOkType, FailureType>(
    mapFn: (input: InputOkType) => MaybePromise<OutputOkType>
  ) =>
  async (
    input: MaybePromise<Result<InputOkType, FailureType>>
  ): Promise<Result<OutputOkType, FailureType>> => {
    const awaitedInput = await input;
    if (isOk(awaitedInput)) {
      const result = await mapFn(awaitedInput.ok);
      return ok(result);
    }
    return awaitedInput;
  };

export const mapFailureAsync =
  <OkType, InputFailureType, OutputFailureType>(
    mapFn: (input: InputFailureType) => MaybePromise<OutputFailureType>
  ) =>
  async (
    input: MaybePromise<Result<OkType, InputFailureType>>
  ): Promise<Result<OkType, OutputFailureType>> => {
    const awaitedInput = await input;
    if (isFailure(awaitedInput)) {
      const result = await mapFn(awaitedInput.failure);
      return fail(result);
    }
    return awaitedInput;
  };
