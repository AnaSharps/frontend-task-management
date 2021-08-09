import React, { useEffect } from "react";
import { useAppDispatch } from "../../app/hooks";
import { setMainContainerData } from "../../features/mainContainerData";
import styles from "./style.module.css";

export interface TaskManagementProps {}

export const TaskManagement: React.FC<TaskManagementProps> = () => {
	const dispatch = useAppDispatch();

	useEffect(() => {
		dispatch(
			setMainContainerData({
				title: "Task Management",
				search: false,
				backstring: "",
			})
		);
	}, []);
	return <></>;
};
