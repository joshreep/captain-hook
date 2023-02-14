//And here is a test case to validate the hook:

import React from "react";
import { render, fireEvent, cleanup } from "@testing-library/react";
import useKeyPress from "./useKeyPress";

describe("useKeyPress", () => {
  afterEach(cleanup);

  it("returns true when the target key is being pressed", () => {
    const TestComponent = () => {
      const enterPressed = useKeyPress("Enter");

      return <div>{enterPressed.toString()}</div>;
    };

    const { getByText } = render(<TestComponent />);

    fireEvent.keyDown(document, { key: "Enter" });

    expect(getByText("true")).toBeTruthy();
  });

  it("returns false when the target key is not being pressed", () => {
    const TestComponent = () => {
      const enterPressed = useKeyPress("Enter");

      return <div>{enterPressed.toString()}</div>;
    };

    const { getByText } = render(<TestComponent />);

    expect(getByText("false")).toBeTruthy();
  });

  it("returns false when any key other than the target key is pressed", () => {
    const TestComponent = () => {
      const enterPressed = useKeyPress("Enter");

      return <div>{enterPressed.toString()}</div>;
    };

    const { getByText } = render(<TestComponent />);

    fireEvent.keyDown(document, { key: "A" });

    expect(getByText("false")).toBeTruthy();
  });
});
