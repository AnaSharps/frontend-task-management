import { SearchOutlined } from "@ant-design/icons";
import React from "react";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { selectUserList } from "../../../features/users";
import { CustomButton } from "../../Button";
import { CustomInput } from "../../CustomInput";
import { Dropdown } from "../../Dropdown";

export interface SearchComponentProps {}

export const SearchComponent: React.FC<SearchComponentProps> = () => {
	const users = useAppSelector(selectUserList);

	const dispatch = useAppDispatch();

	const usersList = users?.map((user) => ({
		text: user.name,
		value: user.email,
	}));
	usersList.push({ text: "All", value: "All" });

	function searchTasks() {}

	return (
		<div
			style={{
				display: "flex",
				// justifyContent: "space-between",
				alignItems: "center",
			}}
		>
			<div style={{ display: "flex", padding: 0, margin: 0, width: "50%" }}>
				<CustomInput
					placeholder="Search by title or description..."
					// width="50%"
					// containerStyle={{ width: "50%" }}
					// value={search}
					// onChange={(e) => handleChange(e.target.value, "search")}
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
					value="All"
					options={users?.map((user) => ({
						text: user.name,
						value: user.email,
					}))}
					onSelect={(val: string) => {
						// dispatch(setGetTasksAssignor(val));
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
					value="All"
					options={usersList}
					onSelect={(val: string) => {
						// dispatch(setGetTasksAssignee(val));
					}}
				/>
			</div>
		</div>
	);
};
