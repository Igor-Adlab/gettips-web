import { MutateConfig, useMutation } from "react-query";

import { useService } from "../useService";

/**
 *
 * @param {MutateConfig} config
 */
export function useResetPassword(config) {
  const auth = useService("auth");

  return useMutation((payload) => auth.reset(payload), config);
}
