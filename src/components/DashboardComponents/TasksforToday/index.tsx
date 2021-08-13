import { Card } from "antd";
import React, { useEffect } from "react";
import { useAppSelector } from "../../../app/hooks";
import { selectTodaysTasks } from "../../../features/dashboard";
import dateFormat from "dateformat";
import styles from "./style.module.css";
import { statusColors } from "../../../app/constants";
import { DisplayTasks } from "../../TaskManagementComponents/DisplayTasks";

export interface TasksforTodayProps {}

export const TasksforToday: React.FC<TasksforTodayProps> = () => {
	const tasks = useAppSelector(selectTodaysTasks);

	const todaysTasks = tasks?.all
		.slice()
		.sort(
			(task1, task2) => Date.parse(task1.dueDate) - Date.parse(task2.dueDate)
		);

	return (
		<div style={{ display: "flex", flexDirection: "column", width: "50%" }}>
			<div style={{ fontWeight: "bolder", padding: "1em", paddingTop: 0 }}>
				Tasks for Today
			</div>
			<Card className={styles.card}>
				<DisplayTasks tasks={todaysTasks} />
			</Card>
		</div>
	);
};
