import { MoreOutlined } from "@ant-design/icons";
import dateFormat from "dateformat";
import React, { useState } from "react";
import { statusColors } from "../../../app/constants";
import { useAppSelector } from "../../../app/hooks";
import { DashboardState, TaskType } from "../../../features/dashboard";
import { selectCurrUser } from "../../../features/login";
import { TaskState } from "../../../features/taskManagement";
import { Options } from "../TaskOptions";
import styles from "./style.module.css";

export interface DisplayTasksProps {
	tasks: TaskType[] | undefined;
	displayStatus?: boolean;
}

export const DisplayTasks: React.FC<DisplayTasksProps> = ({
	tasks,
	displayStatus = true,
}) => {
	const [displayOptions, setDisplayOptions] = useState<number | null>(null);

	const currUser = useAppSelector(selectCurrUser);

	function compare(date: string) {
		const t1 = new Date(date);
		const now = new Date();
		if (t1.getTime() <= now.getTime()) return true;
		else return false;
	}

	return (
		<div style={{ overflowY: "scroll" }}>
			{tasks?.map((task, idx) => {
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
					<div className={styles.itemContainer} key={idx}>
						<span className={styles.time}>{dueTime}</span>
						<div className={styles.detailsContainer}>
							<div className={styles.headRow}>
								<span className={styles.heading}>{task.taskName}</span>
								{displayStatus && (
									<span
										className={styles.status}
										style={{
											color: statusColors[status],
										}}
									>
										{status}
									</span>
								)}
								<div
									itemType="button"
									onClick={() =>
										setDisplayOptions(
											displayOptions !== null && task.id === displayOptions
												? null
												: task.id
										)
									}
									style={{
										display:
											task.assignee === currUser?.email.toLowerCase() ||
											task.assignor === currUser?.email.toLowerCase()
												? "flex"
												: "none",
										position: "relative",
										maxHeight: "22px",
									}}
								>
									<Options
										taskId={task.id}
										status={task.status}
										style={{
											display: task.id === displayOptions ? "flex" : "none",
										}}
									/>
									<MoreOutlined />
								</div>
							</div>
							<span className={styles.desc}>{task.taskDesc}</span>
							<span className={styles.created}>{assignedBy}</span>
						</div>
					</div>
				);
			})}
		</div>
	);
};
