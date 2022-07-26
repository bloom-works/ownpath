const React = require("react");
const { axe, toHaveNoViolations } = require("jest-axe");
const { render } = require("@testing-library/react");
const { BrowserRouter } = require("react-router-dom");
const ResultDetail = require("./pages/ResultDetail");
const Whoops = require("./pages/Whoops");
const Home = require("./pages/Home");
const GuidedSearch = require("./pages/GuidedSearch");
const Search = require("./pages/Search/Search");

expect.extend(toHaveNoViolations);

it("Should not have basic a11y issues, ResultDetail", async () => {
  const { container } = render(
    <BrowserRouter>
      <ResultDetail />
    </BrowserRouter>
  );

  const results = await axe(container);

  expect(results).toHaveNoViolations();
});

it("Should not have basic a11y issues, Whoops", async () => {
  const { container } = render(
    <BrowserRouter>
      <Whoops />
    </BrowserRouter>
  );

  const results = await axe(container);

  expect(results).toHaveNoViolations();
});

it("Should not have basic a11y issues, Home", async () => {
  const { container } = render(
    <BrowserRouter>
      <Home />
    </BrowserRouter>
  );

  const results = await axe(container);

  expect(results).toHaveNoViolations();
});

it("Should not have basic a11y issues, GuidedSearch", async () => {
  const { container } = render(
    <BrowserRouter>
      <GuidedSearch />
    </BrowserRouter>
  );

  const results = await axe(container);

  expect(results).toHaveNoViolations();
});

it("Should not have basic a11y issues, Search", async () => {
  const { container } = render(
    <BrowserRouter>
      <Search />
    </BrowserRouter>
  );

  const results = await axe(container);

  expect(results).toHaveNoViolations();
});
