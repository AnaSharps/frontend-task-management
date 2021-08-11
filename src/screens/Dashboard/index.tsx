import { Card } from "antd";
import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { MyStats } from "../../components/DashboardComponents/MyStats";
import { TasksforToday } from "../../components/DashboardComponents/TasksforToday";
import { TaskStats } from "../../components/DashboardComponents/TaskStats";
import {
	getMyStatsInit,
	getTodaysTasksInit,
	selectMyStats,
	selectTodaysTasks,
} from "../../features/dashboard";
import { selectCurrUser } from "../../features/login";
import { setMainContainerData } from "../../features/mainContainerData";
import {
	getTaskStatsInit,
	selectTaskStats,
} from "../../features/taskManagement";
import styles from "./style.module.css";

export interface DashboardProps {}

export const Dashboard: React.FC<DashboardProps> = () => {
	const dispatch = useAppDispatch();
	const currUser = useAppSelector(selectCurrUser);

	useEffect(() => {
		dispatch(
			setMainContainerData({
				title: "Dashboard",
				search: false,
				backstring: "",
			})
		);
		dispatch(getTodaysTasksInit());
		dispatch(getMyStatsInit());
		dispatch(getTaskStatsInit(currUser ? currUser.email : ""));
	}, []);
	return (
		<div
			style={{
				display: "flex",
				flexDirection: "column",
			}}
		>
			<div
				style={{
					display: "flex",
					justifyContent: "space-between",
					height: "550px",
					maxHeight: "550px",
					paddingBottom: "20px",
					marginRight: 0,
				}}
			>
				<TasksforToday />
				<MyStats />
			</div>
			<TaskStats />
		</div>
	);
};
