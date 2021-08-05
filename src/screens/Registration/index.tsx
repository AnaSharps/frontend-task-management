import React, { useEffect, useState } from "react";
// import { Formik } from "formik";
import styles from "./style.module.css";
import { CustomInput } from "../../components/CustomInput";
// import { useAppSelector, useAppDispatch } from "../../app/hooks";
import { CustomButton } from "../../components/Button";
import { LabelledFormComponent } from "../../components/LabelledFormComponent";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { selectToken, setToken } from "../../features/token";
import { changeLoading } from "../../features/loading";
import { useHistory, useLocation } from "react-router-dom";
import axios from "axios";
import { host } from "../../app/constants";
import { FormContainer } from "../../components/FormContainer";
import { validate } from "../../app/utils/validate";

export interface RegisterProps {}

export const Register: React.FC<RegisterProps> = () => {
	// const loading = useAppSelector(selectLoading);

	const location = useLocation();
	const verifyToken = location.search.split("=")[1];

	const token = useAppSelector(selectToken);

	const dispatch = useAppDispatch();

	const [username, setUsername] = useState("");
	const [pass, setPass] = useState("");
	const [confirmPass, setConfirmPass] = useState("");

	const [usernameErr, setUsernameErr] = useState("");
	const [passErr, setPassErr] = useState("");
	const [confirmPassErr, setConfirmPassErr] = useState("");

	const validDetails = !usernameErr && !passErr && !confirmPassErr;

	let history = useHistory();

	useEffect(() => {
		if (token) {
			history.push("/home/loggedin");
		}
	}, [token]);

	function handleChange(val: string, type: "name" | "pass" | "confirmPass") {
		if (type === "name") {
			const valid = validate({ val, type: "name" });
			setUsernameErr(valid);
			setUsername(val);
		} else if (type === "pass") {
			const valid = validate({ val, type: "pass" });
			setPassErr(valid);
			setPass(val);
		} else {
			if (confirmPass === pass) setConfirmPassErr("");
			else setConfirmPassErr("Passwords do not match");
			setConfirmPass(val);
		}
	}

	function handleSubmit() {
		if (validDetails) {
			dispatch(changeLoading("processing"));
			axios
				.post(
					`${host}/register/signup`,
					{
						username,
						password: pass,
						token: verifyToken,
					},
					{
						withCredentials: true,
					}
				)
				.then((res) => {
					window.localStorage.setItem("token", res.data.token);
					dispatch(setToken(res.data.token));
					dispatch(changeLoading("passed"));
					history.push("/home/loggedin");
				})
				.catch((err) => console.error(err));
		}
	}

	return (
		<FormContainer pageTitle="REGISTER">
			<LabelledFormComponent
				labelText="Name"
				error={usernameErr !== ""}
				errorText={usernameErr}
			>
				<CustomInput
					type="text"
					containerStyle={{ margin: "5px 0px" }}
					backgroundColor="#ededed"
					placeholder="Name"
					className={styles.email}
					name="username"
					value={username}
					onChange={(e) => handleChange(e.target.value, "name")}
				/>
			</LabelledFormComponent>
			<LabelledFormComponent
				labelText="Password"
				error={passErr !== ""}
				errorText={passErr}
			>
				<CustomInput
					backgroundColor="#ededed"
					containerStyle={{ margin: "5px 0px" }}
					placeholder="Password"
					type="password"
					className={styles.passwordInput}
					name="password"
					value={pass}
					onChange={(e) => handleChange(e.target.value, "pass")}
				/>
			</LabelledFormComponent>
			<LabelledFormComponent
				labelText="Confirm Password"
				error={confirmPassErr !== ""}
				errorText={confirmPassErr}
			>
				<CustomInput
					backgroundColor="#ededed"
					containerStyle={{ margin: "5px 0px" }}
					placeholder="Confirm Password"
					type="password"
					className={styles.passwordInput}
					name="confirm-password"
					value={confirmPass}
					onChange={(e) => handleChange(e.target.value, "confirmPass")}
				/>
			</LabelledFormComponent>
			<CustomButton
				className={styles.button}
				type="primary"
				text="CONFIRM"
				loading={false}
				onClick={() => handleSubmit()}
			/>
		</FormContainer>
	);
};
