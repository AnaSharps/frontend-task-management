import { Card } from "antd";
import React from "react";
import styles from "./style.module.css";

export interface MyStatsProps {}

export const MyStats: React.FC<MyStatsProps> = () => {
	return (
		<div style={{ display: "flex", flexDirection: "column", width: "50%" }}>
			<div style={{ fontWeight: "bolder", padding: "1em", paddingTop: 0 }}>
				My Performance
			</div>
			<Card
				style={{
					height: "100%",
					flexGrow: 1,
					minWidth: "400px",
					backgroundColor: "white",
					borderRadius: "10px",
					boxShadow: "2px 2px 5px grey",
					padding: "24px",
				}}
			>
				highChart
			</Card>
		</div>
	);
};
