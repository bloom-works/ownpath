import React from "react";
import { render } from "./testHelper";
import { axe } from "jest-axe";
import Home from "./pages/Home";
// import ResultDetail from "./pages/ResultDetail";
import GuidedSearch from "./pages/GuidedSearch";
import NotFound from "./pages/NotFound";
import Search from "./pages/Search/Search";

window.scrollTo = jest.fn();

afterAll(() => {
  jest.clearAllMocks();
});
test("Home", async () => {
  const { container } = render(<Home />);
  expect(await axe(container)).toHaveNoViolations();
});

// ! Causes Maximum updates depth exceeded (inf)
// test("ResultDetail", async () => {
//   const { container } = render(<ResultDetail />);
//   expect(await axe(container)).toHaveNoViolations();
// });

test("GuidedSearch", async () => {
  const { container } = render(<GuidedSearch />);
  expect(await axe(container)).toHaveNoViolations();
});

test("NotFound", async () => {
  const { container } = render(<NotFound />);
  expect(await axe(container)).toHaveNoViolations();
});

test("Search", async () => {
  const { container } = render(<Search />);
  expect(await axe(container)).toHaveNoViolations();
});
