import React from "react";
import { axe, toHaveNoViolations } from "jest-axe";
import { cleanup, render } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";

import GuidedSearch from "../pages/GuidedSearch";

expect.extend(toHaveNoViolations);

it("Should not have basic a11y issues", async () => {
  const { container } = render(
    <Router>
      <GuidedSearch />
    </Router>
  );

  const results = await axe(container);

  expect(results).toHaveNoViolations();

  cleanup();
});
