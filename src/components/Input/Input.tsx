import React, { CSSProperties, ReactNode } from "react";

interface Props {
  type: string;
  placeholder?: string;
  value?: any;
  className?: string;
  name?: string;
  children?: ReactNode;
  maxLength?: number;
  showMaxLength?: boolean;
  rows?: number;
  resize?:
    | "both"
    | "-moz-initial"
    | "inherit"
    | "initial"
    | "revert"
    | "unset"
    | "block"
    | "horizontal"
    | "inline"
    | "none"
    | "vertical";
  overflow?: string;
  id?: string;
  disabled?: boolean;
  style?: CSSProperties;
  border?: string;
  clearable?: boolean;
  max?: number;
  min?: number;
  onClick?: () => void;
  onChange?: (value: any) => void;
  onKeyDown?: (event: any) => void;
  onBlur?: () => void;
  options?: { value: string; label: string }[];
}

const Input = (props: Props) => {
  const IsRadioOrCheckbox = props.type === "radio" || props.type === "checkbox";

  const className = `text-sm border ${
    props.border ? `border-${props.border}` : ""
  } rounded outline-none focus:border-input ${
    IsRadioOrCheckbox ? "" : "w-full"
  } min-w-0 z-0`;

  const style = { paddingLeft: "4px", ...props.style };

  if (!IsRadioOrCheckbox && !style.height) {
    style.height = "28px";
  } else if (IsRadioOrCheckbox && !style.height) {
    style.height = "auto";
  }

  const onChange = (val: any) => {
    if (props.onChange) {
      if (props.type === "select" || props.type === "select-creatable") {
        return props.onChange(val);
      } else {
        return props.onChange(val.target.value);
      }
    } else {
      return null;
    }
  };

  if (props.type === "select") {
    return (
      <select
        value={props.value}
        onChange={onChange}
        className={`${className} ${props.className ? props.className : ""}`}
        style={style}
        disabled={props.disabled}
      >
        {props.options.map(opt => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
    );
  } else {
    return (
      <input
        id={props.id}
        type={props.type}
        className={`${className} ${props.className ? props.className : ""}`}
        style={style}
        placeholder={props.placeholder}
        value={props.value}
        onChange={onChange}
        name={props.name}
        autoComplete="off"
        disabled={props.disabled}
        min={props.min}
        max={props.max}
        onClick={props.onClick ? props.onClick : () => null}
        onKeyDown={props.onKeyDown}
        onBlur={props.onBlur}
      />
    );
  }
};

export default Input;
