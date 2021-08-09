import { Card } from "antd";
import React from "react";
import styles from "./style.module.css";

export interface TaskStatsProps {}

export const TaskStats: React.FC<TaskStatsProps> = () => {
	return (
		<Card
			style={{
				height: "100%",
				flexGrow: 1,
				backgroundColor: "white",
				borderRadius: "10px",
				padding: "24px",
				boxShadow: "2px 2px 5px grey",
			}}
		>
			Bar Chart
		</Card>
	);
};
