import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { useHistory, useLocation } from "react-router-dom";
import { host } from "../../app/constants";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import {
	getUsersInit,
	selectDisplayNum,
	selectOffset,
	selectSearch,
	selectUserList,
	setDisplay,
	setSearch,
	setUsers,
} from "../../features/users";
import { selectToken, setToken } from "../../features/token";
import styles from "./style.module.css";
import { selectIsAdmin, setAdmin } from "../../features/isAdmin";
import { CustomButton } from "../../components/Button";
import { setSignup } from "../../features/signupForm";
import { CustomInput } from "../../components/CustomInput";
import { changeLoading, selectStatus } from "../../features/loading";
import { authorizationInit } from "../../features/authorization";
import { logoutInit } from "../../features/login";

export interface DashboardProps {
	admin?: boolean;
}

export const Dashboard: React.FC<DashboardProps> = ({ admin = false }) => {
	const dispatch = useAppDispatch();
	const users = useAppSelector(selectUserList);
	const display = useAppSelector(selectDisplayNum);
	const search = useAppSelector(selectSearch);
	const status = useAppSelector(selectStatus);

	const history = useHistory();
	const location = useLocation();
	const [displayPage, setDisplayPage] = useState(true);
	const [once, setOnce] = useState(false);

	// useEffect(() => {
	// 	if (!once) {
	// 		setOnce(true);
	// 		dispatch(authorizationInit(location.pathname));
	// 	} else if (status === "failed") {
	// 		history.push("/login");
	// 	} else if (status === "passed") {
	// 		setDisplayPage(true);
	// 	}
	// }, [status]);

	function addUser() {
		dispatch(setSignup(true));
		history.push("/app/login");
	}

	function logout() {
		dispatch(logoutInit());
	}

	function handleChange(val: number | string, type: "display" | "search") {
		if (type === "display" && typeof val === "number") {
			dispatch(setDisplay(val));
		} else if (typeof val === "string" && type === "search") {
			dispatch(setSearch(val));
		}
	}

	function searchUsers() {
		dispatch(getUsersInit());
	}

	function changePassword() {
		history.push("/home/changePassword");
	}

	return (
		<div>
			{displayPage && (
				<>
					<div style={{ display: "flex" }}>
						{admin && (
							<CustomButton
								isSecondary={false}
								text="Add User"
								onClick={addUser}
							/>
						)}
						<CustomButton isSecondary={false} text="Logout" onClick={logout} />
						<CustomButton
							isSecondary={false}
							text="Change Password"
							onClick={changePassword}
						/>
					</div>
					<CustomInput
						placeholder={"display"}
						value={display}
						type="number"
						onChange={(e) => handleChange(e.target.value, "display")}
					/>
					<CustomInput
						placeholder={"Search"}
						type="text"
						value={search ? search : ""}
						onChange={(e) => handleChange(e.target.value, "search")}
					/>
					<CustomButton
						onClick={searchUsers}
						text="Search"
						isSecondary={false}
					/>
					{/* {loading && loading} */}
					{users?.map((user, idx) => {
						return (
							<div
								style={{
									display: "flex",
									flexDirection: "column",
									justifyContent: "center",
									padding: "24px",
								}}
								key={idx * 309487}
							>
								<div
									style={{
										display: "flex",
										flexDirection: "row",
										justifyContent: "space-between",
										padding: "24px",
									}}
								>
									<span>S.no.: {idx + 1}</span>
									<span>ID: {user.name} </span>
									<span>Email: {user.email} </span>
									<span>Created By: {user.createdBy} </span>
								</div>

								{admin && (
									<>
										<CustomButton isSecondary={false} text="Delete User" />
									</>
								)}
							</div>
						);
					})}
				</>
			)}
		</div>
	);
};
