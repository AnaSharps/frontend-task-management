import { Card } from "antd";
import React, { useEffect } from "react";
import { useAppSelector } from "../../../app/hooks";
import { selectTodaysTasks } from "../../../features/dashboard";
import dateFormat from "dateformat";
import styles from "./style.module.css";
import { statusColors } from "../../../app/constants";

export interface TasksforTodayProps {}

export const TasksforToday: React.FC<TasksforTodayProps> = () => {
	const tasks = useAppSelector(selectTodaysTasks);

	const todaysTasks = tasks?.all
		.slice()
		.sort(
			(task1, task2) => Date.parse(task1.dueDate) - Date.parse(task2.dueDate)
		);

	function compare(date: string) {
		const t1 = new Date(date);
		const now = new Date();
		if (t1.getTime() <= now.getTime()) return true;
		else return false;
	}

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
				{todaysTasks?.map((task, idx) => {
					let status = task.status;
					if (status !== "completed" && compare(task.dueDate)) {
						status = "overdue";
					} else if (status === "pending") status = "assigned";

					// 12-hours format time to display
					const dueTime = dateFormat(new Date(task.dueDate), "h:MM TT");

					const assignedOn = new Date(task.created_at);
					const assignedOnDate = dateFormat(assignedOn, "mmmm dS, yyyy");
					const assignedOnTime = dateFormat(assignedOn, "h:MM TT");
					const assignedBy = `---by ${task.assignorName} on ${assignedOnDate} at ${assignedOnTime}`;

					return (
						<div style={{ display: "flex", paddingBottom: "20px" }} key={idx}>
							<span
								style={{
									fontWeight: "bolder",
									fontSize: "18px",
								}}
							>
								{dueTime}
							</span>
							<div
								style={{
									display: "flex",
									flexDirection: "column",
									paddingLeft: "15px",
									flexGrow: 1,
								}}
							>
								<div
									style={{ display: "flex", justifyContent: "space-between" }}
								>
									<span style={{ fontWeight: "bold", fontSize: "14px" }}>
										{task.taskName}
									</span>
									<span
										style={{
											fontStyle: "italic",
											color: statusColors[status],
											fontSize: "14px",
										}}
									>
										{status}
									</span>
								</div>
								<span
									style={{
										fontSize: "12px",
										paddingTop: "3px",
										color: "grey",
									}}
								>
									{task.taskDesc}
								</span>
								<span
									style={{
										fontSize: "12px",
										fontStyle: "italic",
										paddingTop: "3px",
										color: "grey",
									}}
								>
									{assignedBy}
								</span>
							</div>
						</div>
					);
				})}
			</Card>
		</div>
	);
};
