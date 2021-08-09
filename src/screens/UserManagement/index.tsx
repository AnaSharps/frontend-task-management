import React, { useEffect } from "react";
import { useHistory, useLocation } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import {
	getUsersInit,
	selectDisplayNum,
	selectOffset,
	selectTotalCount,
	selectUserList,
	setOffset,
} from "../../features/users";
import styles from "./style.module.css";
import { CustomButton } from "../../components/Button";
import { selectCurrUser } from "../../features/login";
import { deleteUserInit } from "../../features/deregistration";
import { CustomCard } from "../../components/Card";
import { setMainContainerData } from "../../features/mainContainerData";
import { Avatar, Select } from "antd";
import { DeleteOutlined, UserOutlined } from "@ant-design/icons";
import { SearchUsersComponent } from "../../components/SearchUsersComponent";

export interface UserManagementProps {
	admin?: boolean;
}

const { Option } = Select;

interface SearchComponentProps {
	label: string;
	setSelectedValue: Function;
}

const SearchComponent: React.FC<SearchComponentProps> = ({
	label,
	setSelectedValue,
}) => {
	const users = useAppSelector(selectUserList);

	function handleChange(val: string) {
		setSelectedValue(val);
	}

	return (
		<>
			<div>{label}</div>
			<Select defaultValue="all" style={{ width: 120 }} onChange={handleChange}>
				<Option value="all">All</Option>
				{users?.map((user) => (
					<Option value={user.name} key={user.email}>
						{user.name}
					</Option>
				))}
			</Select>
		</>
	);
};

export const UserManagement: React.FC<UserManagementProps> = ({
	admin = false,
}) => {
	const dispatch = useAppDispatch();
	const users = useAppSelector(selectUserList);
	const ofset = useAppSelector(selectOffset);
	const display = useAppSelector(selectDisplayNum);
	const total = useAppSelector(selectTotalCount);
	const currUser = useAppSelector(selectCurrUser);

	const history = useHistory();
	const location = useLocation();

	function searchUsers(viewNext: number = 0) {
		if (viewNext === 1) dispatch(setOffset(ofset + display));
		else if (viewNext === -1) dispatch(setOffset(ofset - display));
		dispatch(getUsersInit());
	}

	useEffect(() => {
		dispatch(
			setMainContainerData({
				title: "Users",
				search: true,
				backstring: "",
			})
		);
	}, []);

	function deleteUser(email: string) {
		dispatch(deleteUserInit(email));
	}

	return (
		<div
			style={{
				alignItems: "center",
				justifyContent: "center",
				display: "flex",
				flexDirection: "column",
			}}
		>
			<CustomCard title={<SearchUsersComponent />}>
				{users?.map((user, idx) => {
					return (
						<div
							className={styles.userRow}
							key={idx}
							style={{
								display: "flex",
								padding: "24px",
							}}
						>
							<Avatar
								size={32}
								style={{
									backgroundColor: "#c1b6ca",
									display: "flex",
									alignItems: "center",
									justifyContent: "center",
									borderRadius: "16px",
								}}
								icon={<UserOutlined />}
							/>
							<div style={{ marginLeft: "16px", flexGrow: 1 }}>
								<div>{user.name.toUpperCase()}</div>
								<div>{user.email.toLowerCase()}</div>
							</div>

							{currUser?.role === "ADMIN" && (
								<div className={styles.deleteButton}>
									<CustomButton
										isSecondary={false}
										text=" Delete"
										prefixIcon={<DeleteOutlined />}
										onClick={() => deleteUser(user.email)}
										style={{ right: 0 }}
									/>
								</div>
							)}
						</div>
					);
				})}
			</CustomCard>
			{ofset > 0 && (
				<CustomButton text="Prev" onClick={() => searchUsers(-1)} />
			)}
			{total > ofset + display && (
				<CustomButton text="Next" onClick={() => searchUsers(1)} />
			)}
		</div>
	);
};
