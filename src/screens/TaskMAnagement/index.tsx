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
		<Card className={styles.card}>
			<RadioTitle
				selectedView={selectedView}
				setSelectedView={setSelectedView}
			/>
			<div className={styles.taskContent}>
				{selectedView === "List" && <TaskList />}
				{selectedView === "Overview" && <TaskOverview />}
			</div>
		</Card>
	);
};
