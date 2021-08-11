import { Button, Card } from "antd";
import React, { useEffect, useState } from "react";
import { backgroundColor } from "../../app/constants";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { TaskList } from "../../components/TaskManagementComponents/List";
import { TaskOverview } from "../../components/TaskManagementComponents/Overview";
import { RadioTasks } from "../../components/TaskManagementComponents/RadioTasks";
// import { CustomButton } from "../../components/Button";
// import { RadioTasks } from "../../components/RadioTasks";
import { SearchComponent } from "../../components/TaskManagementComponents/SearchTasksComponent";
import { selectCurrUser } from "../../features/login";
import { setMainContainerData } from "../../features/mainContainerData";
import {
	getTasksInit,
	getTaskStatsInit,
	getTodaysStatsInit,
} from "../../features/taskManagement";
import styles from "./style.module.css";

export interface TaskManagementProps {}

export interface RadioTitleProps {
	selectedView?: "List" | "Overview";
	setSelectedView: Function;
}

const RadioTitle: React.FC<RadioTitleProps> = ({
	selectedView = "List",
	setSelectedView,
}) => {
	return (
		<RadioTasks
			onChange={(e: { target: { value: string } }) =>
				setSelectedView(e.target.value)
			}
			block
			activeTab={selectedView}
		/>
	);
};

export const TaskManagement: React.FC<TaskManagementProps> = () => {
	const [selectedView, setSelectedView] = useState<"List" | "Overview">("List");

	const currUser = useAppSelector(selectCurrUser);
	const dispatch = useAppDispatch();

	useEffect(() => {
		dispatch(
			setMainContainerData({
				title: "Task Management",
				search: false,
				backstring: "",
			})
		);
		dispatch(getTasksInit());
		dispatch(getTaskStatsInit(currUser ? currUser.email : ""));
		dispatch(getTodaysStatsInit(currUser ? currUser.email : ""));
	}, []);
	return (
		<Card
			style={{
				background: "#f1f1f1",
				height: "90%",
				display: "flex",
				flexDirection: "column",
				borderRadius: "10px",
				boxShadow: "2px 2px 5px grey",
				// padding: "24px",
			}}
		>
			<RadioTitle
				selectedView={selectedView}
				setSelectedView={setSelectedView}
			/>
			<div
				style={{
					backgroundColor: "white",
					borderRadius: "10px",
					flexGrow: 1,
					padding: "16px",
				}}
			>
				{selectedView === "List" && <TaskList />}
				{selectedView === "Overview" && <TaskOverview />}
			</div>
		</Card>
	);
};
