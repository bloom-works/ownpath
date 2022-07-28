import { render as defaultRender, RenderOptions } from "@testing-library/react";
import { ReactElement, JSXElementConstructor } from "react";
import { BrowserRouter } from "react-router-dom";

export function render(
  ui: ReactElement<any, string | JSXElementConstructor<any>>,
  { wrapper, ...options }: RenderOptions = {}
) {
  if (!wrapper) {
    wrapper = ({ children }) => <BrowserRouter>{children}</BrowserRouter>;
  }
  return defaultRender(ui, { wrapper, ...options });
}
