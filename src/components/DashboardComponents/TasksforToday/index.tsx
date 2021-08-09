import { Card } from "antd";
import React from "react";
import styles from "./style.module.css";

export interface TasksforTodayProps {}

export const TasksforToday: React.FC<TasksforTodayProps> = () => {
	return (
		<div style={{ display: "flex", flexDirection: "column", width: "50%" }}>
			<div style={{ fontWeight: "bolder", padding: "1em", paddingTop: 0 }}>
				Tasks for Today
			</div>
			<Card
				style={{
					height: "100%",
					width: "fit-content",
					minWidth: "400px",
					backgroundColor: "white",
					borderRadius: "10px",
					boxShadow: "2px 2px 5px grey",
					padding: "24px",
				}}
			>
				List
			</Card>
		</div>
	);
};
