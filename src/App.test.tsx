import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { createMemoryHistory } from "history";
import { Router } from "react-router-dom";
import ReviewDetailInfo from "./components/ReviewDetailInfo/ReviewDetailInfo";

const testingData = {
  detailInfo: {
    id: "5d707203ab3c204b8e132ede",
    author: "Nelda Carlson",
    place: "Luckys",
    published_at: "Tue Feb 26 2008 20:52:20 GMT-0600 (Central Standard Time)",
    rating: 1,
    content:
      "Labore eiusmod esse reprehenderit ea et irure ipsum aliqua sit amet exercitation laboris ut est. Ex veniam id duis labore pariatur voluptate ipsum sunt laboris. Sit elit ipsum consectetur elit ipsum exercitation eu ullamco. Consequat ea ea sunt aliquip laboris excepteur consectetur duis. Pariatur ipsum laborum fugiat labore eiusmod laboris Lorem exercitation elit tempor nisi dolor eiusmod. Proident consequat eu ullamco amet quis sint velit nostrud.\r\n",
    comment: {
      creator: "",
      content: "",
      date: "",
    },
  },
};

test("Review Detail Info should have the save and cancel button to be disabled when no comments", () => {
  const history = createMemoryHistory();
  const state = testingData;
  history.push("/detail/5d707203ab3c204b8e132ede", state);

  render(
    <Router navigator={history} location={history.location}>
      <ReviewDetailInfo />
    </Router>
  );

  expect(screen.getByTestId("save-button")).toBeDisabled();
  expect(screen.getByTestId("cancel-button")).toBeDisabled();
});

test("Review Detail Info should have the save and cancel button to be disable when both of the fields have values", async () => {
  const history = createMemoryHistory();
  const user = userEvent.setup();
  const state = testingData;
  history.push("/detail/5d707203ab3c204b8e132ede", state);

  render(
    <Router navigator={history} location={history.location}>
      <ReviewDetailInfo />
    </Router>
  );

  await user.type(screen.getByTestId("comment-field"), "This is a test");
  expect(screen.getByTestId("save-button")).toBeDisabled();
  expect(screen.getByTestId("cancel-button")).toBeDisabled();
});

test.only("Review Detail Info should have the save and cancel button to be enabled when both fields have values", async () => {
  const history = createMemoryHistory();
  const user = userEvent.setup();
  const state = testingData;
  history.push("/detail/5d707203ab3c204b8e132ede", state);

  render(
    <Router navigator={history} location={history.location}>
      <ReviewDetailInfo />
    </Router>
  );

  await user.type(screen.getByTestId("comment-field"), "This is a test");
  await user.type(
    screen.getByTestId("creator-field"),
    "This is a test creator"
  );
  expect(screen.getByTestId("save-button")).not.toBeDisabled();
});
