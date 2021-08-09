import { Card } from "antd";
import React, { useEffect } from "react";
import { useAppDispatch } from "../../app/hooks";
import { MyStats } from "../../components/DashboardComponents/MyStats";
import { TasksforToday } from "../../components/DashboardComponents/TasksforToday";
import { TaskStats } from "../../components/DashboardComponents/TaskStats";
import { setMainContainerData } from "../../features/mainContainerData";
import styles from "./style.module.css";

export interface DashboardProps {}

export const Dashboard: React.FC<DashboardProps> = () => {
	const dispatch = useAppDispatch();

	useEffect(() => {
		dispatch(
			setMainContainerData({
				title: "Dashboard",
				search: false,
				backstring: "",
			})
		);
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
					minHeight: "20vh",
					paddingBottom: "20px",
				}}
			>
				<TasksforToday />
				<MyStats />
			</div>
			<TaskStats />
		</div>
	);
};
