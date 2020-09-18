import { QueryConfig, useQuery } from "react-query";

import { useService } from "../useService";

/**
 * @param {string} transaction
 * @param {QueryConfig} config
 */
export function useTransactionInfo(transaction, config) {
  const trx = useService("transaction");

  return useQuery(
    ["transaction", transaction],
    (key, params) => trx.find(params),
    config
  );
}
