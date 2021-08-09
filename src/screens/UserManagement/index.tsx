import React, { useEffect } from "react";
import { useHistory, useLocation } from "react-router-dom";
import { host } from "../../app/constants";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import {
	getUsersInit,
	selectDisplayNum,
	selectOffset,
	selectSearch,
	selectTotalCount,
	selectUserList,
	setDisplay,
	setOffset,
	setSearch,
} from "../../features/users";
import styles from "./style.module.css";
import { CustomButton } from "../../components/Button";
import { CustomInput } from "../../components/CustomInput";
import { selectStatus } from "../../features/loading";
import { logoutInit } from "../../features/login";
import { deleteUserInit } from "../../features/deregistration";
import { CustomCard } from "../../components/Card";
import { setMainContainerData } from "../../features/mainContainerData";

export interface DashboardProps {
	admin?: boolean;
}

export const Dashboard: React.FC<DashboardProps> = ({ admin = false }) => {
	const dispatch = useAppDispatch();
	const users = useAppSelector(selectUserList);
	const search = useAppSelector(selectSearch);
	const ofset = useAppSelector(selectOffset);
	const display = useAppSelector(selectDisplayNum);
	const total = useAppSelector(selectTotalCount);

	const history = useHistory();
	const location = useLocation();

	useEffect(() => {
		dispatch(
			setMainContainerData({
				title: "Users",
				search: true,
				backstring: "",
			})
		);
	}, []);

	function addUser() {
		history.push("/admin/addUser");
	}

	function handleChange(val: number | string, type: "display" | "search") {
		if (type === "display" && typeof val === "number") {
			dispatch(setDisplay(val));
		} else if (typeof val === "string" && type === "search") {
			dispatch(setSearch(val));
		}
	}

	function searchUsers(viewNext: number = 0) {
		if (viewNext === 1) dispatch(setOffset(ofset + display));
		else if (viewNext === -1) dispatch(setOffset(ofset - display));
		dispatch(getUsersInit());
	}

	function changePassword() {
		history.push("/home/changePassword");
	}

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
			<div style={{ display: "flex" }}>
				{admin && (
					<CustomButton isSecondary={false} text="Add User" onClick={addUser} />
				)}
				<CustomButton
					isSecondary={false}
					text="Change Password"
					onClick={changePassword}
				/>
			</div>
			<CustomInput
				placeholder={"Search"}
				type="text"
				value={search ? search : ""}
				backgroundColor="white"
				onChange={(e) => handleChange(e.target.value, "search")}
			/>
			<CustomButton
				onClick={() => searchUsers()}
				text="Search"
				isSecondary={false}
			/>
			<CustomCard>
				<div
					style={{
						display: "flex",
						flexDirection: "row",
						padding: "24px",
						fontWeight: "bold",
					}}
				>
					<span
						style={{
							width: "10%",
						}}
					>
						S.no.
					</span>
					<span
						style={{
							width: "30%",
						}}
					>
						Name{" "}
					</span>
					<span
						style={{
							width: "30%",
						}}
					>
						Email
					</span>
					<span>Created By</span>
				</div>
				{users?.map((user, idx) => {
					return (
						<div
							style={{
								display: "flex",
								flexDirection: "row",
								// justifyContent: "space-between",
								padding: "24px",
							}}
						>
							<span
								style={{
									width: "10%",
								}}
							>
								{idx + 1}
							</span>
							<span
								style={{
									width: "30%",
								}}
							>
								{user.name.toLowerCase()}{" "}
							</span>
							<span
								style={{
									width: "30%",
								}}
							>
								{user.email.toLowerCase()}{" "}
							</span>
							<span>{user.createdBy.toLowerCase()} </span>

							{admin && (
								<>
									<CustomButton
										isSecondary={false}
										text="Delete User"
										onClick={() => deleteUser(user.email)}
										style={{ width: "5%", left: "95%" }}
									/>
								</>
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
