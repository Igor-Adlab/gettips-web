import { QueryConfig, useQuery } from "react-query";

import { useService } from "../useService";

/**
 * @param {QueryConfig} config
 */
export function useBalance(config) {
  const dashboard = useService("dashboard");

  return useQuery("balance", (key) => dashboard.balance(), config);
}
