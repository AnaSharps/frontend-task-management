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
import { Avatar, Button, Pagination, Select } from "antd";
import { DeleteOutlined, UserOutlined } from "@ant-design/icons";
import { SearchUsersComponent } from "../../components/SearchUsersComponent";

export interface UserManagementProps {
	admin?: boolean;
}

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

	const activePage = ofset / display + 1;

	function searchUsers(page: number = 1) {
		dispatch(setOffset((page - 1) * display));
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
		<div className={styles.userContainer}>
			<CustomCard title={<SearchUsersComponent />}>
				{users?.map((user, idx) => {
					return (
						<div className={styles.userRow} key={idx}>
							<Avatar
								size={32}
								className={styles.avatar}
								icon={<UserOutlined />}
							/>
							<div className={styles.userDisplay}>
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
				<div className={styles.paginationContainer}>
					{
						<Pagination
							defaultCurrent={1}
							total={total}
							current={activePage}
							pageSize={display}
							onChange={(page) => {
								searchUsers(page);
							}}
						/>
					}
				</div>
			</CustomCard>
		</div>
	);
};
