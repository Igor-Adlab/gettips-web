import { MutateConfig, useMutation } from "react-query";

import { useService } from "../useService";

/**
 *
 * @param {MutateConfig} config
 */
export function useSignUp(config) {
  const auth = useService("auth");

  return useMutation((payload) => auth.signUp(payload), config);
}
