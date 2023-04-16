import { beforeEach, describe, expect, it } from "vitest";
import { render, screen, cleanup } from "@testing-library/react";
import "@testing-library/jest-dom";

import Chip from "./chip.component";
import type { ChipProps } from "./chip.model";

describe("Chip component", () => {
  beforeEach(cleanup);

  it.each([{ button: true }, { small: true }, { button: true, small: true }])(
    "should match snapshot with various kinds of props",
    async (props: Partial<ChipProps>) => {
      render(
        <Chip data-testid="chip" {...props}>
          Hello world
        </Chip>,
      );

      const component = screen.queryByTestId("chip");

      expect(component).toMatchSnapshot();
    },
  );

  it("should contain `is-active` when active prop is `true`", () => {
    render(
      <Chip data-testid="chip" active>
        Hello world
      </Chip>,
    );

    const component = screen.queryByTestId("chip");

    expect(component).toHaveClass("is-active");
  });

  it("should contain `Chip--small` when small prop is `true`", () => {
    render(
      <Chip data-testid="chip" small>
        Hello world
      </Chip>,
    );

    const component = screen.queryByTestId("chip");

    expect(component).toHaveClass("Chip--small");
  });
});
