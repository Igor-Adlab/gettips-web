import { MutateConfig, useMutation } from "react-query";

import { useService } from "../useService";

/**
 * @param {MutateConfig} config
 */
export function usePayoutPreview(config) {
  const payout = useService("payout");

  return useMutation((params) => payout.preview(params), config);
}
