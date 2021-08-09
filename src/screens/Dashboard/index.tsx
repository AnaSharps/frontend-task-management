import React, { useEffect } from "react";
import { useAppDispatch } from "../../app/hooks";
import { setMainContainerData } from "../../features/mainContainerData";
import styles from "./style.module.css";

export interface DashboardProps {}

export const Dashboard: React.FC<DashboardProps> = () => {
	const dispatch = useAppDispatch();

	useEffect(() => {
		dispatch(
			setMainContainerData({
				title: "Dashboard",
				search: false,
				backstring: "",
			})
		);
	}, []);
	return <></>;
};
