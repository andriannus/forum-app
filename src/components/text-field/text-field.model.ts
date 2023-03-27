import { ChangeEventHandler, HTMLInputTypeAttribute } from "react";

export interface TextFieldProps {
  autoComplete: string;
  autoCapitalize: string;
  className: string;
  counter: number;
  disabled: boolean;
  id: string;
  name: string;
  onChange: ChangeEventHandler<HTMLInputElement>;
  placeholder: string;
  readOnly: boolean;
  type: HTMLInputTypeAttribute;
  value: string;
}
