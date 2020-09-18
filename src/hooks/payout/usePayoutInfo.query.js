import { QueryConfig, useQuery } from "react-query";

import { useService } from "../useService";

/**
 * @param {string} payload
 * @param {QueryConfig} config
 */
export function usePayoutInfo(payload, config) {
  const payout = useService("payout");

  return useQuery(
    ["payout.info", payload],
    (key, params) => payout.info(params),
    config
  );
}
