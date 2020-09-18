import { MutateConfig, useMutation } from "react-query";

import { useService } from "../useService";

/**
 *
 * @param {MutateConfig} config
 */
export function useSingIn(config) {
  const auth = useService("auth");

  return useMutation((payload) => auth.signIn(payload), config);
}
