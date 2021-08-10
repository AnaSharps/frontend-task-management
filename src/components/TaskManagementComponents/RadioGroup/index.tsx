import { Radio, RadioChangeEvent } from "antd";
import React, { useState } from "react";
import styles from "./style.module.css";

export interface RadioGroupProps {
  options: {
    label: string | number;
    value: string | number;
    disabled?: true;
    icon?: React.ReactNode;
  }[];
  onChange?: Function;
  defaultValue?: string | number;
  dividerText?: string;
}

export const RadioGroup: React.FC<RadioGroupProps> = ({
  options,
  defaultValue,
  onChange = () => null,
  dividerText,
}) => {
  const [selected, setSelected] = useState(defaultValue);
  const onChangeHandeler = (e: RadioChangeEvent) => {
    onChange(e.target.value);
    setSelected(e.target.value);
  };
  return (
    <Radio.Group
      className={styles.radioGroup}
      // options={options}
      value={selected}
      size="large"
      onChange={(val) => onChangeHandeler(val)}
      optionType="button"
    >
      {options.map(({ label, value, disabled, icon }, index) => (
        <>
          <Radio.Button
            className={styles.center}
            value={value}
            disabled={disabled}
          >
            {icon}
            <span>{label}</span>
          </Radio.Button>
          {dividerText && index !== options.length - 1 && (
            <span className={styles.dividerText}>{dividerText}</span>
          )}
        </>
      ))}
    </Radio.Group>
  );
};
