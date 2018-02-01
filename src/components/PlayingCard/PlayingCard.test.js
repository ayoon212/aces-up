import React from "react";
import PlayingCard from "../PlayingCard";

import renderer from "react-test-renderer";

it("renders without crashing", () => {
  const rendered = renderer.create(<PlayingCard />).toJSON();
  expect(rendered).toBeTruthy();
});
