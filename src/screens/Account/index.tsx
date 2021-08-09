/* eslint-disable react/no-children-prop */
import React, { useEffect /* , { useContext } */ } from "react";
import { Avatar, Tag } from "antd";
import { useRouteMatch } from "react-router-dom";
import styles from "./styles.module.css";
import { CheckOutlined, UserOutlined } from "@ant-design/icons";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { selectCurrUser } from "../../features/login";
import { setMainContainerData } from "../../features/mainContainerData";
import { CustomTag } from "../../components/CustomTag";

export interface AccountProps {}

export const Account: React.FC<AccountProps> = () => {
	const currUser = useAppSelector(selectCurrUser);
	const dispatch = useAppDispatch();

	useEffect(() => {
		dispatch(
			setMainContainerData({
				title: "Account",
				search: false,
				backstring: "",
			})
		);
	}, []);

	return (
		<div
			className={styles.container}
			key="account"
			style={{ paddingTop: "24px" }}
		>
			<Avatar
				size={100}
				style={{
					color: "black",
					backgroundColor: "grey",
					display: "flex",
					alignItems: "center",
					justifyContent: "center",
					borderRadius: "50px",
				}}
				icon={<UserOutlined />}
			/>
			<div
				style={{
					display: "flex",
					flexDirection: "column",
					paddingLeft: "16px",
					flexGrow: 1,
				}}
			>
				<span style={{ fontWeight: "bolder", fontSize: 24 }}>
					{currUser?.name}
				</span>
				<CustomTag
					icon={<CheckOutlined />}
					text={currUser?.role === "ADMIN" ? "Admin" : "User"}
					customColor="#1C518F"
					fill
					leads
					// className={classNames(styles.tags)}
					// onSelect={() => onSelect("hospital")}
					// noBorder={leadType !== "hospital"}
				/>
				{/* <CustomTag >
					{currUser?.role === "ADMIN" ? "Admin" : "User"}
				</CustomTag> */}
				<div style={{ display: "flex" }}>
					<div style={{ fontWeight: "bolder", paddingRight: "5px" }}>
						Email:{" "}
					</div>{" "}
					<div>{currUser?.email.toLowerCase()}</div>
				</div>
				<div style={{ display: "flex" }}>
					<div style={{ fontWeight: "bolder", paddingRight: "5px" }}>
						Created By:{" "}
					</div>{" "}
					<div>{currUser?.createdBy.toLowerCase()}</div>
				</div>
				{/* <span style={{ fontWeight: "bolder" }}>Created By: </span>{" "}
				<span>{currUser?.createdBy}</span> */}
			</div>
		</div>
	);
};
