import { atom } from "recoil";

export const tokenState = atom({
  key: "@auth/token",
  default: localStorage.getItem("access_token"),
});
