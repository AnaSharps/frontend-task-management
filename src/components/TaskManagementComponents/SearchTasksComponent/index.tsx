import { SearchOutlined } from "@ant-design/icons";
import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import {
	getTasksInit,
	searchAssignee,
	searchAssignor,
	selectGetTasksAssignee,
	selectGetTasksAssignor,
	selectGetTasksKeyword,
	setGetTasksAssignee,
	setGetTasksAssignor,
	setGetTasksKeywords,
} from "../../../features/taskManagement";
import { selectUserList } from "../../../features/users";
import { CustomButton } from "../../Button";
import { CustomInput } from "../../CustomInput";
import { Dropdown } from "../../Dropdown";

export interface SearchComponentProps {}

export const SearchComponent: React.FC<SearchComponentProps> = () => {
	const users = useAppSelector(selectUserList);
	const search = useAppSelector(selectGetTasksKeyword);
	const assignee = useAppSelector(selectGetTasksAssignee);
	const assignor = useAppSelector(selectGetTasksAssignor);

	const dispatch = useAppDispatch();

	const usersList = users?.map((user) => ({
		text: user.name,
		value: user.email,
	}));
	usersList.push({ text: "All", value: "" });

	function searchTasks() {
		dispatch(getTasksInit());
	}

	function handleChange(val: string) {
		dispatch(setGetTasksKeywords(val));
	}

	return (
		<div
			style={{
				display: "flex",
				alignItems: "center",
			}}
		>
			<div style={{ display: "flex", padding: 0, margin: 0, width: "50%" }}>
				<CustomInput
					placeholder="Search by title or description..."
					value={search}
					onChange={(e) => handleChange(e.target.value)}
				/>
				<CustomButton text="" icon={<SearchOutlined />} onClick={searchTasks} />
			</div>
			<div
				style={{
					display: "flex",
					padding: 0,
					margin: 0,
					width: "25%",
					justifyContent: "center",
					alignItems: "center",
				}}
			>
				<span style={{ paddingRight: "5px" }}>Assignor</span>
				<Dropdown
					placeholder="Eg. John Doe"
					value={assignor}
					defaultValue={""}
					options={usersList ? usersList : []}
					onSelect={(val: string) => {
						dispatch(searchAssignor(val));
					}}
				/>
			</div>
			<div
				style={{
					display: "flex",
					padding: 0,
					margin: 0,
					width: "25%",
					justifyContent: "center",
					alignItems: "center",
				}}
			>
				<span style={{ paddingRight: "5px" }}>Assignee</span>
				<Dropdown
					placeholder="Eg. John Doe"
					value={assignee}
					defaultValue={""}
					options={usersList ? usersList : []}
					onSelect={(val: string) => {
						dispatch(searchAssignee(val));
					}}
				/>
			</div>
		</div>
	);
};
