import { QueryConfig, useQuery } from "react-query";

import { useService } from "../useService";

/**
 * @param {QueryConfig} config
 */
export function useCardsList(config) {
  const cards = useService("cards");

  return useQuery("cards", (key) => cards.load(), config);
}
