import { MutateConfig, useMutation } from "react-query";

import { useService } from "../useService";

/**
 *
 * @param {MutateConfig} config
 */
export function usePayoutConfirm(config) {
  const payout = useService("payout");

  return useMutation((payload) => payout.confirm(payload), config);
}
