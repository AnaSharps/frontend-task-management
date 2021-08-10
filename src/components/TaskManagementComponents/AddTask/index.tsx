import { Modal, Card, DatePicker, TimePicker } from "antd";
import React, { useState } from "react";
import { backgroundColor } from "../../../app/constants";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { selectCurrUser } from "../../../features/login";
import { addNewTaskInit } from "../../../features/taskManagement";
import { selectUserList } from "../../../features/users";
import { CustomInput } from "../../CustomInput";
import { Dropdown } from "../../Dropdown";
import { FormContainer } from "../../FormContainer";
import { LabelledFormComponent } from "../../LabelledFormComponent";
import styles from "./style.module.css";

export interface AddTaskProps {
	visible: boolean;
	changeVisibilty: Function;
}

export const AddTask: React.FC<AddTaskProps> = ({
	visible,
	changeVisibilty,
}) => {
	const currUser = useAppSelector(selectCurrUser);
	const users = useAppSelector(selectUserList);

	const [task, setTask] = useState({
		name: "",
		desc: "",
		dueDate: "",
		assignee: currUser ? currUser.email : "",
	});

	const [error, setError] = useState({
		name: "",
		desc: "",
		dueDate: "",
		assignee: "",
	});

	const usersList = users?.map((user) => ({
		text: user.email === currUser?.email ? "Me" : user.name,
		value: user.email,
	}));

	function handleChange(
		val: string,
		type: "name" | "desc" | "dueDate" | "assignee"
	) {
		switch (type) {
			case "name":
				if (val) {
					setError({ ...error, name: "" });
				} else {
					setError({ ...error, name: "Required" });
				}
				setTask({ ...task, name: val });
				break;
			case "desc":
				if (val) {
					setError({ ...error, desc: "" });
				} else {
					setError({ ...error, desc: "Required" });
				}
				setTask({ ...task, desc: val });
				break;
			case "dueDate":
				if (val) {
					setError({ ...error, dueDate: "" });
				} else {
					setError({ ...error, dueDate: "Required" });
				}
				setTask({ ...task, dueDate: val });
				break;
			case "assignee":
				if (val) {
					setError({ ...error, assignee: "" });
				} else {
					setError({ ...error, assignee: "Required" });
				}
				setTask({ ...task, assignee: val });
				break;
		}
	}

	const dispatch = useAppDispatch();

	return (
		<Modal
			title="Create New Task"
			centered
			visible={visible}
			onOk={() => {
				if (
					!!!error["name"] &&
					!!!error["dueDate"] &&
					!!!error["desc"] &&
					!!!error["assignee"]
				) {
					dispatch(addNewTaskInit(task));
					changeVisibilty(false);
				}
			}}
			onCancel={() => {
				changeVisibilty(false);
			}}
			bodyStyle={{ backgroundColor }}
			// destroyOnClose
			okButtonProps={{ style: { backgroundColor, border: 0 } }}
			cancelButtonProps={{
				style: {
					backgroundColor: "white",
					border: 0,
					color: backgroundColor,
				},
			}}
		>
			<FormContainer formWrapperClassName={styles.formWrapper}>
				<LabelledFormComponent
					labelText="Title"
					error={!!error["name"]}
					errorText={error["name"]}
				>
					<CustomInput
						placeholder="Eg: Reminder for Scrum Meeting"
						onChange={(e) => handleChange(e.target.value, "name")}
						value={task.name}
						size="small"
						backgroundColor="#ededed"
					/>
				</LabelledFormComponent>
				<LabelledFormComponent
					labelText="Description"
					error={!!error["desc"]}
					errorText={error["desc"]}
				>
					<CustomInput
						placeholder="Enter description of task"
						onMultilineChange={(e: { target: { value: string } }) =>
							handleChange(e.target.value, "desc")
						}
						value={task.desc}
						multiline
						rows={4}
						style={{ border: "1px solid black" }}
						backgroundColor="#ededed"
					/>
				</LabelledFormComponent>
				<LabelledFormComponent
					labelText="Due Date"
					error={!!error["dueDate"]}
					errorText={error["dueDate"]}
				>
					<DatePicker
						showTime
						onOk={(val) => handleChange(val.toLocaleString(), "dueDate")}
					/>
				</LabelledFormComponent>
				<LabelledFormComponent
					labelText="Assignee"
					error={!!error["assignee"]}
					errorText={error["assignee"]}
				>
					<Dropdown
						placeholder="Eg. John Doe"
						value={task.assignee}
						defaultValue={currUser?.email}
						options={usersList ? usersList : []}
						onSelect={(val: string) => {
							setTask({ ...task, assignee: val });
						}}
					/>
				</LabelledFormComponent>
			</FormContainer>
		</Modal>
	);
};
