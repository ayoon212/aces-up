import React from "react";
import Home from "../Home";

import renderer from "react-test-renderer";

it("renders without crashing", () => {
  const rendered = renderer.create(<Home />).toJSON();
  expect(rendered).toBeTruthy();
});
