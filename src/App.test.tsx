import { render, screen } from "@testing-library/react";
import { createMemoryHistory } from "history";
import { Router } from "react-router-dom";
import ReviewDetailInfo from "./components/ReviewDetailInfo/ReviewDetailInfo";

// test("Review Detail Info should have the save button disable", () => {
//   let history = createMemoryHistory();

//   render(
//     <Router location={history.location} navigator={history}>
//       <ReviewDetailInfo />
//     </Router>
//   );
//   expect(screen.getByRole("button")).toBeDisabled();
// });
