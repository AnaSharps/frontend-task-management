import React from "react";
import { SearchComponent } from "../SearchTasksComponent";
import ReactHighcharts from "react-highcharts";
import styles from "./style.module.css";
import { useAppSelector } from "../../../app/hooks";
import { selectMyStats } from "../../../features/dashboard";
import {
	selectTaskStats,
	selectTodaysStats,
} from "../../../features/taskManagement";
import { Card } from "antd";

export interface TaskOverviewProps {}

export const TaskOverview: React.FC<TaskOverviewProps> = () => {
	const myStats = useAppSelector(selectTodaysStats);
	const taskStats = useAppSelector(selectTaskStats);

	const config = {
		chart: {
			plotBorderWidth: 0,
			plotShadow: false,
			type: "pie",
			size: "50%",
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
				margin: [0, 0, 0, 0],
				spacingTop: 0,
				spacingLeft: 90,
				showInLegend: true,
				// outerSize: "50%",
				size: "30%",
				floatingPoint: true,
				verticalAlign: "top",
			},
		},
		legend: {
			layout: "vertical",
			align: "right",
			verticalAlign: "middle",
		},
		series: [
			{
				name: "Tasks",
				colorByPoint: true,
				data: [
					{
						name: "Assigned",
						y: myStats ? myStats.noActivity : 0,
					},
					{
						name: "InProgress",
						y: myStats ? myStats.inProgress : 0,
					},
					{
						name: "Overdue",
						y: myStats ? myStats.overdue : 0,
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

	const colConfig = {
		chart: {
			type: "column",
		},
		title: {
			text: null,
		},
		xAxis: {
			categories: taskStats ? taskStats.map((task) => task.date) : [],
			title: {
				text: null,
			},
		},
		yAxis: {
			min: 0,
			title: {
				text: null,
			},
		},
		plotOptions: {
			column: {
				dataLabels: {
					enabled: false,
				},
				// size: "20%",
				pointPadding: 0,
			},
		},
		credits: {
			enabled: false,
		},
		series: [
			{
				name: "Completed On Time",
				data: taskStats ? taskStats.map((task) => task.completedOnTime) : [],
			},
			{
				name: "Completed After Deadline",
				data: taskStats
					? taskStats.map((task) => task.completedAfterDeadline)
					: [],
			},
			{
				name: "Overdue",
				data: taskStats ? taskStats.map((task) => task.overdue) : [],
			},
			{
				name: "All Due",
				data: taskStats ? taskStats.map((task) => task.allDue) : [],
			},
		],
	};

	return (
		<Card title={<ReactHighcharts config={config} />} className={styles.card}>
			<ReactHighcharts config={colConfig} />
		</Card>
	);
};
