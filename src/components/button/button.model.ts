import type { MouseEventHandler } from "react";

export interface ButtonProps {
  color: "" | "primary" | "success";
  disabled: boolean;
  fullWidth: boolean;
  id: string;
  onClick: MouseEventHandler<HTMLButtonElement>;
  outlined: boolean;
  rounded: boolean;
  small: boolean;
  to: string;
  type: "button" | "submit" | "reset";
}
