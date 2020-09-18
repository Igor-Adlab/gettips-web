import { MutateConfig, useMutation } from "react-query";

import { useService } from "../useService";

/**
 *
 * @param {MutateConfig} config
 */
export function useInitializeTransaction(config) {
  const trx = useService("transaction");

  return useMutation((payload) => trx.create(payload), config);
}
