/* eslint-disable react/no-children-prop */
import React, { useEffect /* , { useContext } */ } from "react";
import { Avatar, Tag } from "antd";
import { useHistory, useRouteMatch } from "react-router-dom";
import styles from "./styles.module.css";
import { CheckOutlined, UserOutlined } from "@ant-design/icons";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { selectCurrUser } from "../../features/login";
import { setMainContainerData } from "../../features/mainContainerData";
import { CustomTag } from "../../components/CustomTag";
import { CustomButton } from "../../components/Button";

export interface AccountProps {}

export const Account: React.FC<AccountProps> = () => {
	const currUser = useAppSelector(selectCurrUser);
	const dispatch = useAppDispatch();
	const history = useHistory();

	useEffect(() => {
		dispatch(
			setMainContainerData({
				title: "Account",
				search: false,
				backstring: "",
			})
		);
	}, []);

	function changePassword() {
		history.push("/home/changePassword");
	}

	return (
		<div className={styles.container} key="account">
			<Avatar size={100} className={styles.avatar} icon={<UserOutlined />} />
			<div className={styles.details}>
				<span className={styles.taskLabel}>{currUser?.name}</span>
				<CustomTag
					icon={<CheckOutlined />}
					text={currUser?.role === "ADMIN" ? "Admin" : "User"}
					customColor="#1C518F"
					fill
				/>

				<div className={styles.detailsContainer}>
					<div className={styles.detailsHeading}>Email: </div>{" "}
					<div>{currUser?.email.toLowerCase()}</div>
				</div>
				<div className={styles.detailsContainer}>
					<div className={styles.detailsHeading}>Created By: </div>{" "}
					<div>{currUser?.createdBy.toLowerCase()}</div>
				</div>
			</div>
			<div style={{ display: "flex" }}>
				<CustomButton
					isSecondary={false}
					text="Change Password"
					onClick={changePassword}
				/>
			</div>
		</div>
	);
};
