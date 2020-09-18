import { MutateConfig, useMutation } from "react-query";

import { useService } from "../useService";

/**
 *
 * @param {MutateConfig} config
 */
export function useConfirmPhone(config) {
  const auth = useService("auth");

  return useMutation((payload) => auth.confirm(payload), config);
}
