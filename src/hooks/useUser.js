import { createContext, useContext, useMemo } from "react";
import { queryCache } from "react-query";
import { useRecoilState } from "recoil";

import { tokenState } from "../atoms";
import { useUserProfile } from "./user";

export const UserContext = createContext();

export function useUser() {
  return useContext(UserContext);
}

export function useProvideUser() {
  const [token, setToken] = useRecoilState(tokenState);

  const authenticated = useMemo(() => !!token, [token]);

  const user$ = useUserProfile({
    retry: false,
    enabled: !!token,
    onError: (err) => {
      if (err.status === 401) {
        localStorage.clear();

        setToken("");
        queryCache.clear();
      }
    },
  });

  const signOut = () => setToken("");

  const user = useMemo(() => _.get(user$.data, "data", {}), user$.data);
  const phone = useMemo(() => _.get(user$.data, "data.phone"), user$.data);
  const confirmation = useMemo(
    () => _.get(user$.data, "extra.confirmation"),
    user$.data
  );

  return {
    ...user$,
    user,
    extra: null,
    confirmation,
    authenticated,
    phone,
    signOut,
  };
}
