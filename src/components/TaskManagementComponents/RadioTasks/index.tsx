/* eslint-disable no-console */
import { Radio, RadioChangeEvent } from "antd";
import React, { useState, useEffect } from "react";
import cn from "classnames";
import styles from "./style.module.css";

export interface RadioTasksProps {
	onChange?: Function;
	options?: { label: string; value: string | number }[];
	block?: boolean;
	activeTab?: string | number;
}

export const RadioTasks: React.FC<RadioTasksProps> = ({
	onChange = () => null,
	options = [
		{ label: "List", value: "List" },
		{ label: "Overview", value: "Overview" },
	],
	block = false,
	activeTab,
}) => {
	const [select, setSelect] = useState(activeTab);

	const onChangeHandeler = (val: RadioChangeEvent) => {
		setSelect(val.target.value);
		onChange(val);
	};
	useEffect(() => {
		setSelect(activeTab);
		console.log(activeTab);
	}, [activeTab]);
	return (
		<Radio.Group
			className={cn(styles.radioGroup, {
				[styles.block]: block,
			})}
			options={options}
			style={{ width: "30%" }}
			onChange={(e) => onChangeHandeler(e)}
			value={select}
			optionType="button"
		/>
	);
};
