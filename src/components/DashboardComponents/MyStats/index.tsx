import { Card } from "antd";
import React, { useEffect, useState } from "react";
import ReactHighcharts from "react-highcharts";
import { useAppSelector } from "../../../app/hooks";
import { selectMyStats } from "../../../features/dashboard";
import styles from "./style.module.css";

export interface MyStatsProps {}

export const MyStats: React.FC<MyStatsProps> = () => {
	const myStats = useAppSelector(selectMyStats);

	const config = {
		chart: {
			type: "pie",
			spacingBottom: 0,
		},
		title: {
			text: null,
		},
		plotOptions: {
			pie: {
				allowPointSelect: true,
				cursor: "pointer",
				dataLabels: {
					enabled: false,
				},
				spacingTop: 0,
				showInLegend: true,
				// outerSize: "50%",
				size: "70%",
			},
		},
		series: [
			{
				name: "Tasks",
				colorByPoint: true,
				data: [
					{
						name: "Pending (No Activity)",
						y: myStats ? myStats.pendingNoActivity : 0,
					},
					{
						name: "Pending (In Progress)",
						y: myStats ? myStats.pendingInProgress : 0,
					},
					{
						name: "Overdue (No Activity)",
						y: myStats ? myStats.overdueNoActivity : 0,
					},
					{
						name: "Overdue (In Progress)",
						y: myStats ? myStats.overdueInProgress : 0,
					},
					{
						name: "Completed (On Time)",
						y: myStats ? myStats.completedOnTime : 0,
					},
					{
						name: "Completed (After Deadline)",
						y: myStats ? myStats.completedAfterDeadline : 0,
					},
				],
			},
		],
	};

	useEffect(() => {
		const container = document.querySelector(".highcharts-container");
		container?.setAttribute("style", "height: 250px; position: fixed;");
	});

	return (
		<div style={{ display: "flex", flexDirection: "column", width: "50%" }}>
			<div style={{ fontWeight: "bolder", padding: "1em", paddingTop: 0 }}>
				My Performance
			</div>
			<Card
				style={{
					height: "100%",
					width: "fit-content",
					flexGrow: 1,
					minWidth: "500px",
					backgroundColor: "white",
					borderRadius: "10px",
					boxShadow: "2px 2px 5px grey",
					paddingTop: "24px",
				}}
			>
				<ReactHighcharts config={config} />
			</Card>
		</div>
	);
};