// import { List, ListProps } from "antd";
import React from "react";
import { useAppDispatch } from "../../../app/hooks";
import { setTaskStatusInit } from "../../../features/taskManagement";
import styles from "./style.module.css";

export interface OptionsProps {
	taskId: number;
	status: "pending" | "completed" | "inprogress" | "overdue" | "assigned";
	style?: React.CSSProperties;
}

export const Options: React.FC<OptionsProps> = ({ taskId, status, style }) => {
	const dispatch = useAppDispatch();

	return (
		<div style={style} className={styles.container}>
			{status !== "inprogress" && (
				<div
					className={styles.listItem}
					itemType="button"
					onClick={() => {
						dispatch(setTaskStatusInit(taskId, "inprogress"));
					}}
				>
					Working
				</div>
			)}
			{status !== "completed" && (
				<div
					className={styles.listItem}
					itemType="button"
					onClick={() => dispatch(setTaskStatusInit(taskId, "completed"))}
				>
					Completed
				</div>
			)}
		</div>
	);
};
