import { QueryConfig, useQuery } from "react-query";

import { useService } from "../useService";

/**
 * @param {QueryConfig} config
 */
export function useTransactions(config) {
  const notifications = useService("notifications");

  return useQuery(
    "transactions",
    (key) => notifications.transactions(),
    config
  );
}
