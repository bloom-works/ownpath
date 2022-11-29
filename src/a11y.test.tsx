import React from "react";
import { render } from "./testHelper";
import { axe } from "jest-axe";
import { MemoryRouter } from "react-router-dom";
import MOCK_CARE_PROVIDER_DATA from "./data/ladders_data.json";
import FAQ from "./pages/FAQ";
import Home from "./pages/Home";
import ResultDetail from "./pages/ResultDetail";
import GuidedSearch from "./pages/GuidedSearch";
import NotFound from "./pages/NotFound";
import Search from "./pages/Search/Search";
import Compare from "./pages/Compare";
// Unfortunately I was unable to mock the JSON data set to be smaller subset,
// so just bumping timeout to allow application of filters to complete
// and component to render for testing so Search tests can complete
jest.setTimeout(1000 * 60 * 3);
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
        initialEntries={[
          { state: { data: { ...MOCK_CARE_PROVIDER_DATA[0] } } },
        ]}
      >
        {children}
      </MemoryRouter>
    ),
  });
  expect(await axe(container)).toHaveNoViolations();
  // eslint-disable-next-line testing-library/no-container
  expect(document.activeElement).toBe(container.querySelector("h1"));
});

test("GuidedSearch", async () => {
  const { container } = render(<GuidedSearch />);
  expect(await axe(container)).toHaveNoViolations();
  // eslint-disable-next-line testing-library/no-container
  expect(document.activeElement).toBe(container.querySelector("h1"));
});

test("NotFound", async () => {
  const { container } = render(<NotFound />);
  expect(await axe(container)).toHaveNoViolations();
  // eslint-disable-next-line testing-library/no-container
  expect(document.activeElement).toBe(container.querySelector("h1"));
});

test("Search", async () => {
  const { container } = render(<Search />, {
    wrapper: ({ children }) => (
      <MemoryRouter initialEntries={[{ search: "?zip=80012" }]}>
        {children}
      </MemoryRouter>
    ),
  });
  expect(await axe(container)).toHaveNoViolations();
  // eslint-disable-next-line testing-library/no-container
  expect(document.activeElement).toBe(container.querySelector("h1"));
});

test("FAQ", async () => {
  const { container } = render(<FAQ />);
  expect(await axe(container)).toHaveNoViolations();
  // eslint-disable-next-line testing-library/no-container
  expect(document.activeElement).toBe(container.querySelector("h1"));
});

test("Compare", async () => {
  const { container } = render(<Compare />, {
    wrapper: ({ children }) => (
      <MemoryRouter
        initialEntries={[
          {
            search: `?id=${MOCK_CARE_PROVIDER_DATA[0].id}&id=${MOCK_CARE_PROVIDER_DATA[1].id}`,
          },
        ]}
      >
        {children}
      </MemoryRouter>
    ),
  });

  expect(await axe(container)).toHaveNoViolations();
  // eslint-disable-next-line testing-library/no-container
  expect(document.activeElement).toBe(container.querySelector("h1"));
});
