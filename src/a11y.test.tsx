import React from "react";
import { render } from "./testHelper";
import { axe } from "jest-axe";
import Home from "./pages/Home";

test("Home", async () => {
  const { container } = render(<Home />);
  expect(await axe(container)).toHaveNoViolations();
});

// expect.extend(toHaveNoViolations);
// test("Should not have basic a11y issues, ResultDetail", async () => {
//   const { container } = render(<ResultDetail />);
//   expect(await axe(container)).toHaveNoViolations();
// });

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