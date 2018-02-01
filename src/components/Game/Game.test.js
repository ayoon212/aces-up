import React from "react";
import Game from "../Game";

import renderer from "react-test-renderer";

it("renders without crashing", () => {
  const rendered = renderer.create(<Game />).toJSON();
  expect(rendered).toBeTruthy();
});

it("displays both view children", () => {
  const rendered = renderer.create(<Game />).toJSON();
  expect(rendered.children.length).toEqual(2);
});
