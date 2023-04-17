import { beforeEach, describe, expect, it, vi } from "vitest";
import { cleanup, fireEvent, render, screen } from "@testing-library/react";
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

    expect(component).toHaveClass("Chip--big");
  });

  it("should call onClick prop once when clicked", () => {
    const mockOnClick = vi.fn();

    render(
      <Chip data-testid="chip" button small onClick={mockOnClick}>
        #introduction
      </Chip>,
    );

    const component = screen.getByTestId("chip");
    fireEvent.click(component);

    expect(mockOnClick).toHaveBeenCalledOnce();
  });
});
