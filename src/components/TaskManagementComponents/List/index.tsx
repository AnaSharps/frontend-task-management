import { Divider } from "antd";
import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { selectAllTasks } from "../../../features/taskManagement";
import { DisplayTasks } from "../../DisplayTasks";
import { SearchComponent } from "../SearchTasksComponent";
import styles from "./style.module.css";

export interface TaskListProps {}

export const TaskList: React.FC<TaskListProps> = () => {
	const allTasks = useAppSelector(selectAllTasks);

	return (
		<>
			<SearchComponent />
			<div style={{ display: "flex", maxHeight: "450px" }}>
				<div
					style={{
						display: "flex",
						flexDirection: "column",
						boxShadow: "2px 3px 5px grey",
						width: "25%",
						padding: "16px",
					}}
				>
					<div
						style={{
							fontSize: "18px",
							fontStyle: "italic",
							fontWeight: "bold",
						}}
					>
						To-Do ({allTasks ? allTasks.assigned.length : 0})
					</div>
					<Divider />
					<DisplayTasks tasks={allTasks?.assigned} displayStatus={false} />
				</div>
				<div
					style={{
						display: "flex",
						flexDirection: "column",
						boxShadow: "2px 3px 5px grey",
						width: "25%",
						padding: "16px",
					}}
				>
					<div
						style={{
							fontSize: "18px",
							fontStyle: "italic",
							fontWeight: "bold",
						}}
					>
						IN PROGRESS ({allTasks ? allTasks.inProgress.length : 0})
					</div>
					<Divider />
					<DisplayTasks tasks={allTasks?.inProgress} displayStatus={false} />
				</div>
				<div
					style={{
						display: "flex",
						flexDirection: "column",
						boxShadow: "2px 3px 5px grey",
						width: "25%",
						padding: "16px",
					}}
				>
					<div
						style={{
							fontSize: "18px",
							fontStyle: "italic",
							fontWeight: "bold",
						}}
					>
						COMPLETED ({allTasks ? allTasks.completed.length : 0})
					</div>
					<Divider />
					<DisplayTasks tasks={allTasks?.completed} displayStatus={false} />
				</div>
				<div
					style={{
						display: "flex",
						flexDirection: "column",
						boxShadow: "2px 3px 5px grey",
						width: "25%",
						padding: "16px",
					}}
				>
					<div
						style={{
							fontSize: "18px",
							fontStyle: "italic",
							fontWeight: "bold",
						}}
					>
						OVERDUE ({allTasks ? allTasks.overdue.length : 0})
					</div>
					<Divider />
					<DisplayTasks tasks={allTasks?.overdue} displayStatus={false} />
				</div>
			</div>
		</>
	);
};
