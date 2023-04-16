import { beforeEach, describe, expect, it } from "vitest";
import { render, screen, cleanup } from "@testing-library/react";
import "@testing-library/jest-dom";

import Banner from "./banner.component";
import type { BannerProps } from "./banner.model";

describe("Banner component", () => {
  beforeEach(cleanup);

  it.each([
    { title: "Masuk" },
    { subtitle: "Silakan masukkan" },
    { title: "Masuk", subtitle: "Silakan masukkan" },
    { center: true, title: "Masuk", subtitle: "Silakan masukkan" },
  ])(
    "should match snapshot with various kinds of props",
    async (props: Partial<BannerProps>) => {
      render(<Banner data-testid="banner" {...props} />);

      const component = screen.queryByTestId("banner");

      expect(component).toMatchSnapshot();
    },
  );

  it.each([{ title: "Masuk" }, { title: "Hallo" }, { title: "Lupa Password" }])(
    "should render `title` correctly based on `title` prop",
    async (props: { title: string }) => {
      render(<Banner data-testid="banner" {...props} />);

      const component = screen.queryByTestId("banner");

      expect(component).toHaveTextContent(props.title);
    },
  );

  it.each([
    { subtitle: "Silakan masukkan" },
    { subtitle: "Selamat Datang di We The Thread" },
  ])(
    "should render `subtitle` correctly based on `subtitle` prop",
    async (props: { subtitle: string }) => {
      render(<Banner data-testid="banner" {...props} />);

      const component = screen.queryByTestId("banner");

      expect(component).toHaveTextContent(props.subtitle);
    },
  );
});
