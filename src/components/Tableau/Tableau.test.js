import React from "react";
import Tableau from "../Tableau";

import renderer from "react-test-renderer";

it("renders without crashing", () => {
  const rendered = renderer.create(<Tableau />).toJSON();
  expect(rendered).toBeTruthy();
});

it("renders with empty array", () => {
  const rendered = renderer.create(<Tableau cards={[]} />).toJSON();
  expect(rendered).toBeTruthy();
});

it("renders with cards content", () => {
  const rendered = renderer.create(<Tableau cards={[{suit: "spades", value: 1}]} />).toJSON();
  expect(rendered).toBeTruthy();
});
