// const React = require("react");
// const { axe, toHaveNoViolations } = require("jest-axe");
// const { render } = require("@testing-library/react");
// const { BrowserRouter } = require("react-router-dom");
// const App = require("./App");
// const ResultDetail = require("./pages/ResultDetail");
// const Whoops = require("./pages/Whoops");
// const Home = require("./pages/Home");
// const GuidedSearch = require("./pages/GuidedSearch");
// const Search = require("./pages/Search/Search");

const React = require("react");
const { render } = require("@testing-library/react");
const { axe, toHaveNoViolations } = require("jest-axe");
const ResultDetail = require("./pages/ResultDetail");
// import React from "react";
// import { axe, toHaveNoViolations } from "jest-axe";
// import { render } from "@testing-library/react";
// import ResultDetail from './pages/ResultDetail';

expect.extend(toHaveNoViolations);
test("Should not have basic a11y issues, ResultDetail", async () => {
  const { container } = render(<ResultDetail />);
  expect(await axe(container)).toHaveNoViolations();
});

// it("Should not have basic a11y issues, Whoops", async () => {
//   const { container } = render(
//     <BrowserRouter>
//       <Whoops />
//     </BrowserRouter>
//   );
//   expect(await axe(container)).toHaveNoViolations();
// });

// it("Should not have basic a11y issues, Home", async () => {
//   const { container } = render(
//     <BrowserRouter>
//       <Home />
//     </BrowserRouter>
//   );
//   expect(await axe(container)).toHaveNoViolations();
// });

// it("Should not have basic a11y issues, GuidedSearch", async () => {
//   const { container } = render(
//     <BrowserRouter>
//       <GuidedSearch />
//     </BrowserRouter>
//   );
//   expect(await axe(container)).toHaveNoViolations();
// });

// it("Should not have basic a11y issues, Search", async () => {
//   const { container } = render(
//     <BrowserRouter>
//       <Search />
//     </BrowserRouter>
//   );
//   expect(await axe(container)).toHaveNoViolations();
// });
