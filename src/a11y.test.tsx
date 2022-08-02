import React from "react";
import { render } from "./testHelper";
import { axe } from "jest-axe";
import Home from "./pages/Home";
import ResultDetail from "./pages/ResultDetail";
import GuidedSearch from "./pages/GuidedSearch";
import NotFound from "./pages/NotFound";
import Search from "./pages/Search/Search";
import { MemoryRouter } from "react-router-dom";
import CARE_PROVIDER_DATA from "./data/ladders_data.json";

window.scrollTo = jest.fn();

afterAll(() => {
  jest.clearAllMocks();
});
test("Home", async () => {
  const { container } = render(<Home />);
  expect(await axe(container)).toHaveNoViolations();
});

test("ResultDetail", async () => {
  const { container } = render(<ResultDetail />, {
    wrapper: ({ children }) => (
      <MemoryRouter
        initialEntries={[{ state: { data: { ...CARE_PROVIDER_DATA[0] } } }]}
      >
        {children}
      </MemoryRouter>
    ),
  });
  expect(await axe(container)).toHaveNoViolations();
});

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
