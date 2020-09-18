import { MutateConfig, useMutation } from "react-query";

import { useService } from "../useService";

/**
 *
 * @param {MutateConfig} config
 */
export function useSaveCard(config) {
  const cards = useService("cards");

  return useMutation((payload) => cards.create(payload), config);
}
