import { MutateConfig, useMutation } from "react-query";

import { useService } from "../useService";

/**
 *
 * @param {MutateConfig} config
 */
export function useChangePassword(config) {
  const auth = useService("auth");

  return useMutation((payload) => auth.password(payload), config);
}
