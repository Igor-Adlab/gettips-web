import { QueryConfig, useQuery } from "react-query";

import { useService } from "../useService";

/**
 * @param {string} transaction
 * @param {QueryConfig} config
 */
export function useTransactionStatus(transaction, config) {
  const trx = useService("transaction");

  return useQuery(
    ["status", transaction],
    (key, params) => trx.status(params),
    config
  );
}
