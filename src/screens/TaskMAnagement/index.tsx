import { Button, Card } from "antd";
import React, { useEffect, useState } from "react";
import { useAppDispatch } from "../../app/hooks";
import { RadioTasks } from "../../components/TaskManagementComponents/RadioTasks";
// import { CustomButton } from "../../components/Button";
// import { RadioTasks } from "../../components/RadioTasks";
import { SearchComponent } from "../../components/TaskManagementComponents/SearchTasksComponent";
import { setMainContainerData } from "../../features/mainContainerData";
import styles from "./style.module.css";

export interface TaskManagementProps {}

export interface RadioTitleProps {
	selectedView?: "List" | "Overview";
	setSelectedView: Function;
}

const RadioTitle: React.FC<RadioTitleProps> = ({
	selectedView = "List",
	setSelectedView,
}) => {
	return (
		<RadioTasks
			onChange={(e: { target: { value: string } }) =>
				setSelectedView(e.target.value)
			}
			block
			activeTab={selectedView}
		/>
	);
};

export const TaskManagement: React.FC<TaskManagementProps> = () => {
	const [selectedView, setSelectedView] = useState<"List" | "Overview">("List");
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
	return (
		<Card
			style={{
				backgroundColor: "white",
				height: "90%",
				display: "flex",
				flexDirection: "column",
				borderRadius: "10px",
				boxShadow: "2px 2px 5px grey",
				// padding: "24px",
			}}
		>
			<RadioTitle
				selectedView={selectedView}
				setSelectedView={setSelectedView}
			/>
			<div
				style={{
					backgroundColor: "#f1eef3",
					borderRadius: "10px",
					flexGrow: 1,
					padding: "16px",
				}}
			>
				{selectedView === "List" && <SearchComponent />}
			</div>
		</Card>
	);
};
