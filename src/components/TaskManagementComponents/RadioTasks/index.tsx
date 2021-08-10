/* eslint-disable no-console */
import { Card, Modal, Radio, RadioChangeEvent } from "antd";
import React, { useState, useEffect } from "react";
import cn from "classnames";
import styles from "./style.module.css";
import { CustomButton } from "../../Button";
import { PlusOutlined } from "@ant-design/icons";
import { backgroundColor } from "../../../app/constants";
import { LabelledFormComponent } from "../../LabelledFormComponent";
import { CustomInput } from "../../CustomInput";
import { AddTask } from "../AddTask";

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
	const [showModal, setShowModal] = useState(false);

	const onChangeHandeler = (val: RadioChangeEvent) => {
		setSelect(val.target.value);
		onChange(val);
	};

	useEffect(() => {
		setSelect(activeTab);
		console.log(activeTab);
	}, [activeTab]);

	return (
		<>
			<AddTask visible={showModal} changeVisibilty={setShowModal} />
			<div style={{ display: "flex", justifyContent: "space-between" }}>
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
				<CustomButton
					text="Create Task"
					icon={<PlusOutlined />}
					onClick={() => setShowModal(true)}
				/>
			</div>
		</>
	);
};
