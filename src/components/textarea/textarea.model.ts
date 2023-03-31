import type { ChangeEventHandler } from "react";

export interface TextAreaProps {
  autoCapitalize: string;
  autoComplete: string;
  className: string;
  disabled: boolean;
  id: string;
  name: string;
  onChange: ChangeEventHandler<HTMLTextAreaElement>;
  placeholder: string;
  readOnly: boolean;
  value: string;
}
