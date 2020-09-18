import { QueryConfig, useQuery } from "react-query";

import { useService } from "../useService";

/**
 * @param {QueryConfig} config
 */
export function useUserProfile(config) {
  const auth = useService("auth");

  return useQuery("profile", (key) => auth.me(), config);
}
