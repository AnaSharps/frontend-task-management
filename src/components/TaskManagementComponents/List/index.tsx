import { Divider } from "antd";
import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { selectAllTasks } from "../../../features/taskManagement";
import { DisplayTasks } from "../DisplayTasks";
import { SearchComponent } from "../SearchTasksComponent";
import styles from "./style.module.css";

export interface TaskListProps {}

export const TaskList: React.FC<TaskListProps> = () => {
	const allTasks = useAppSelector(selectAllTasks);

	return (
		<>
			<SearchComponent />
			<div className={styles.container}>
				<div className={styles.subContainer}>
					<div className={styles.heading}>
						To-Do ({allTasks ? allTasks.assigned.length : 0})
					</div>
					<Divider />
					<DisplayTasks tasks={allTasks?.assigned} displayStatus={false} />
				</div>
				<div className={styles.subContainer}>
					<div className={styles.heading}>
						IN PROGRESS ({allTasks ? allTasks.inProgress.length : 0})
					</div>
					<Divider />
					<DisplayTasks tasks={allTasks?.inProgress} displayStatus={false} />
				</div>
				<div className={styles.subContainer}>
					<div className={styles.heading}>
						COMPLETED ({allTasks ? allTasks.completed.length : 0})
					</div>
					<Divider />
					<DisplayTasks tasks={allTasks?.completed} displayStatus={false} />
				</div>
				<div className={styles.subContainer}>
					<div className={styles.heading}>
						OVERDUE ({allTasks ? allTasks.overdue.length : 0})
					</div>
					<Divider />
					<DisplayTasks tasks={allTasks?.overdue} displayStatus={false} />
				</div>
			</div>
		</>
	);
};
