import PropTypes from "prop-types";
import { ChangeEvent, forwardRef, useCallback, useMemo } from "react";

import { TextFieldProps } from "./text-field.model";

import "./text-field.component.scss";

const TextField = forwardRef<HTMLInputElement, Partial<TextFieldProps>>(
  (
    {
      autoCapitalize = "",
      autoComplete = "",
      className = "",
      counter = 0,
      disabled = false,
      id = "",
      name = "",
      onChange = () => null,
      placeholder = "",
      readOnly = false,
      type = "text",
      value = "",
    },
    ref,
  ) => {
    const valueLength = useMemo(() => {
      return value.length;
    }, [value]);

    const handleOnChange = useCallback(
      (event: ChangeEvent<HTMLInputElement>) => {
        onChange(event);
      },
      [onChange],
    );

    return (
      <div {...(className && { className })}>
        <input
          ref={ref}
          id={id}
          {...(!!counter && { maxLength: counter })}
          autoCapitalize={autoCapitalize}
          autoComplete={autoComplete}
          className="TextField-input"
          disabled={disabled}
          name={name}
          placeholder={placeholder}
          readOnly={readOnly}
          title={placeholder}
          type={type}
          value={value}
          onChange={handleOnChange}
        />

        {!!counter && (
          <div className="TextField-counter">
            <span>
              {valueLength} / {counter}
            </span>
          </div>
        )}
      </div>
    );
  },
);

TextField.displayName = "TextField";
TextField.propTypes = {
  autoCapitalize: PropTypes.string,
  autoComplete: PropTypes.string,
  className: PropTypes.string,
  counter: PropTypes.number,
  disabled: PropTypes.bool,
  id: PropTypes.string,
  name: PropTypes.string,
  onChange: PropTypes.func,
  placeholder: PropTypes.string,
  readOnly: PropTypes.bool,
  type: PropTypes.string,
  value: PropTypes.string,
};

export default TextField;
