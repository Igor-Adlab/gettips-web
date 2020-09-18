import { createComponent } from "react-fela";

export const ResponsivePage = createComponent(({}) => ({
  width: "100vw",
  height: "100vh",
}));

export const ResponsiveContent = createComponent(({}) => ({
  width: "100%",
  height: "100%",
  background: "#fff",

  "@media (min-width: 768px)": {
    height: "800px",
    maxWidth: "500px",
    overflow: "auto",
    margin: "auto auto",
    border: "1px solid #f0f0f0",
    boxShadow:
      "0 1px 2px -2px rgba(0, 0, 0, 0.16), 0 3px 6px 0 rgba(0, 0, 0, 0.12), 0 5px 12px 4px rgba(0, 0, 0, 0.09)",
  },
}));
