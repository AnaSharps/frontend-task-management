/* eslint-disable no-unused-vars */
import { Select } from "antd";
import React, { useState } from "react";
import classnames from "classnames";
import styles from "./style.module.css";

const { Option } = Select;

export interface DropdownProps {
	options: { value: string; text: string }[];
	label?: string;
	placeholder?: string;
	backgroundColor?: string;
	onSelect?: Function;
	value?: string;
	name?: string;
	defaultValue?: string;
}

export const Dropdown: React.FC<DropdownProps> = ({
	options,
	label = "Dropdown",
	placeholder = "Search",
	backgroundColor = "",
	onSelect = (val: string) => val,
	value,
	name,
	defaultValue,
}) => {
	const [selected, setSelected] = useState(!!value);
	return (
		<div
			className={classnames(styles.dropdownContainer, {
				[styles.selectedDropdown]: selected,
			})}
		>
			<Select
				className={styles.select}
				showSearch
				defaultValue={defaultValue}
				id={name}
				value={value}
				bordered={false}
				size="small"
				placeholder={placeholder}
				onSelect={(newValue) => {
					onSelect(newValue);
					setSelected(true);
				}}
				onDeselect={(newValue) => {
					setSelected(false);
				}}
				optionFilterProp="children"
				filterOption={(input, option) =>
					option!.title.toLowerCase().indexOf(input.toLowerCase()) >= 0
				}
				filterSort={(optionA, optionB) =>
					optionA.title.toLowerCase().localeCompare(optionB.title.toLowerCase())
				}
				style={{
					backgroundColor,
				}}
				defaultOpen={false}
			>
				{options.map((item) => {
					return (
						<Option value={item.value} key={item.value} title={item.text}>
							{item.text}
						</Option>
					);
				})}
			</Select>
		</div>
	);
};
