import React from "react";
import { render } from "./testHelper";
import { axe } from "jest-axe";
import Home from "./pages/Home";

test("Home", async () => {
  const { container } = render(<Home />);
  expect(await axe(container)).toHaveNoViolations();
});
