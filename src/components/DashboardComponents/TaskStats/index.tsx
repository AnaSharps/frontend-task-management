import { Card } from "antd";
import { Dropdown } from "../../Dropdown";
import React, { useState } from "react";
import ReactHighcharts from "react-highcharts";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import {
	getTaskStatsInit,
	searchAssignor,
	selectTaskStats,
} from "../../../features/taskManagement";
import styles from "./style.module.css";
import { selectUserList } from "../../../features/users";

export interface TaskStatsProps {}

export const TaskStats: React.FC<TaskStatsProps> = () => {
	const taskStats = useAppSelector(selectTaskStats);

	const dispatch = useAppDispatch();
	const users = useAppSelector(selectUserList);
	const usersList = users?.map((user) => ({
		text: user.name,
		value: user.email,
	}));
	usersList.push({ text: "All", value: "" });

	const [assignee, setAssignee] = useState("");

	const config = {
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
			labels: {
				// overflow: "justify",
			},
		},
		plotOptions: {
			column: {
				dataLabels: {
					enabled: false,
				},
				size: "20%",
				pointPadding: 0,
				pointWidth: 25,
			},
		},
		// legend: {
		// 	// layout: "vertical",
		// 	align: "right",
		// 	verticalAlign: "top",
		// 	x: -40,
		// 	y: 80,
		// 	floating: true,
		// 	borderWidth: 1,
		// 	shadow: true,
		// },
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
			<span style={{ paddingRight: "5px" }}>Assignee</span>
			<Dropdown
				placeholder="Eg. John Doe"
				value={assignee}
				defaultValue={""}
				options={usersList ? usersList : []}
				onSelect={(val: string) => {
					dispatch(getTaskStatsInit(val));
					setAssignee(val);
				}}
			/>
			<ReactHighcharts config={config} />
		</Card>
	);
};
