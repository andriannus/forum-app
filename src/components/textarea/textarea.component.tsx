import PropTypes from "prop-types";
import { ChangeEvent, forwardRef, useEffect } from "react";

import { TextAreaProps } from "./textarea.model";

import "./textarea.component.scss";

const TextArea = forwardRef<HTMLTextAreaElement, Partial<TextAreaProps>>(
  (
    {
      autoCapitalize = "",
      autoComplete = "",
      className = "",
      disabled = false,
      id = "",
      name = "",
      onChange = () => null,
      placeholder = "",
      readOnly = false,
      value = "",
    },
    ref,
  ) => {
    useEffect(() => {
      handleAutoResize();
    }, []);

    function handleAutoResize(): void {
      const elements =
        document.querySelectorAll<HTMLTextAreaElement>("textarea");
      const equalizingNumber = 2;

      elements.forEach((element) => {
        element.style.resize = "none";
        element.style.height = "auto";
        element.style.height = `${element?.scrollHeight + equalizingNumber}px`;
      });
    }

    function handleOnChange(event: ChangeEvent<HTMLTextAreaElement>): void {
      handleAutoResize();
      onChange(event);
    }

    return (
      <div {...(className && { className })}>
        <textarea
          ref={ref}
          id={id}
          autoCapitalize={autoCapitalize}
          autoComplete={autoComplete}
          className="TextArea-input"
          disabled={disabled}
          name={name}
          placeholder={placeholder}
          readOnly={readOnly}
          title={placeholder}
          value={value}
          onChange={handleOnChange}
        />
      </div>
    );
  },
);

TextArea.displayName = "TextArea";
TextArea.propTypes = {
  autoCapitalize: PropTypes.string,
  autoComplete: PropTypes.string,
  className: PropTypes.string,
  disabled: PropTypes.bool,
  id: PropTypes.string,
  name: PropTypes.string,
  onChange: PropTypes.func,
  placeholder: PropTypes.string,
  readOnly: PropTypes.bool,
  value: PropTypes.string,
};

export default TextArea;
