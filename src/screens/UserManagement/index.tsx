import axios from "axios";
import React, { useContext, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { host } from "../../app/constants";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import {
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
import { changeLoading } from "../../features/loading";

export interface DashboardProps {}

export const Dashboard: React.FC<DashboardProps> = () => {
	const dispatch = useAppDispatch();
	const users = useAppSelector(selectUserList);
	const display = useAppSelector(selectDisplayNum);
	const ofset = useAppSelector(selectOffset);
	const search = useAppSelector(selectSearch);
	const token = useAppSelector(selectToken);
	// const loading = useAppSelector(selectLoading);
	const isAdmin = useAppSelector(selectIsAdmin);

	const history = useHistory();

	useEffect(() => {
		if (token) {
			axios
				.post(
					`${host}/api/allUsers`,
					{
						search: "",
						display: 20,
						ofset: 0,
						deleted: 0,
					},
					{
						headers: {
							Authorization: token,
						},
					}
				)
				.then((res) => {
					console.log(typeof res);
					console.log(res.data);
					dispatch(setUsers(res.data.users));
					dispatch(setAdmin(res.data.admin));
				})
				.catch((err) => console.error(err));
		} else {
			history.push("/login");
		}
	}, [token]);

	function addUser() {
		dispatch(setSignup(true));
		history.push("/login");
	}

	function logout() {
		dispatch(setToken(null));
		dispatch(setAdmin(false));
		dispatch(setSignup(false));
		window.localStorage.removeItem("token");
	}

	function handleChange(val: number | string, type: "display" | "search") {
		if (type === "display" && typeof val === "number") {
			dispatch(setDisplay(val));
		} else if (typeof val === "string") {
			dispatch(setSearch(val));
		}
	}

	function searchUsers() {
		dispatch(changeLoading("processing"));
		axios
			.post(
				`${host}/api/allUsers`,
				{
					search: search,
					display: display,
					ofset: 0,
					deleted: 0,
				},
				{
					headers: {
						Authorization: token,
					},
				}
			)
			.then((res) => {
				console.log(typeof res);
				console.log(res.data);
				dispatch(setUsers(res.data.users));
				dispatch(changeLoading("passed"));
				dispatch(setAdmin(res.data.admin));
			})
			.catch((err) => console.error(err));
	}

	return (
		<div>
			<div style={{ display: "flex" }}>
				{isAdmin && (
					<CustomButton isSecondary={false} text="Add User" onClick={addUser} />
				)}
				<CustomButton isSecondary={false} text="Logout" onClick={logout} />
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
			<CustomButton onClick={searchUsers} text="Search" isSecondary={false} />
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
							<span>ID: {user.id} </span>
							<span>Email: {user.email} </span>
							<span>Created By: {user.createdBy} </span>
						</div>

						{isAdmin && (
							<>
								<CustomButton isSecondary={false} text="Delete User" />
								<CustomButton isSecondary={false} text="Change Password" />
							</>
						)}
					</div>
				);
			})}
		</div>
	);
};
