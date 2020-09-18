import { createRenderer } from "fela";
import web from "fela-preset-web";

export const createFelaRenderer = () =>
  createRenderer({
    plugins: [...web],
  });
