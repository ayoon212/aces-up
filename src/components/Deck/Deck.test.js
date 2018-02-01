import React from "react";
import Deck from "../Deck";

import renderer from "react-test-renderer";

it("renders without crashing", () => {
  const rendered = renderer.create(<Deck />).toJSON();
  expect(rendered).toBeTruthy();
});

it("displays both view children", () => {
  const rendered = renderer.create(<Deck />).toJSON();
  expect(rendered.children.length).toEqual(2);
});

it("displays cards left", () => {
  const rendered = renderer.create(<Deck numCards={2} />).toJSON();
  expect(rendered.children[1].children[1]).toEqual("2");
});
