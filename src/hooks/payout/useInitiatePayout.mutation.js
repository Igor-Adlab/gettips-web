import { MutateConfig, useMutation } from "react-query";

import { useService } from "../useService";

/**
 *
 * @param {MutateConfig} config
 */
export function useInitiatePayout(config) {
  const payout = useService("payout");

  return useMutation((payload) => payout.initialize(payload), config);
}
