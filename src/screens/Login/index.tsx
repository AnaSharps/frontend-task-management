import React, { useEffect, useState } from "react";
// import { Formik } from "formik";
import styles from "./style.module.css";
import { CustomInput } from "../../components/CustomInput";
import { useAppSelector, useAppDispatch } from "../../app/hooks";
import { CustomButton } from "../../components/Button";
import { LabelledFormComponent } from "../../components/LabelledFormComponent";
import { changeLoading, selectStatus } from "../../features/loading";
import { useHistory } from "react-router-dom";
import { Spin } from "antd";
import { loginInit } from "../../features/login";
import { registrationInit } from "../../features/register";
import { authorizationInit } from "../../features/authorization";
import { validate } from "../../app/utils/validate";
import { FormContainer } from "../../components/FormContainer";

export interface LoginProps {}

export const Login: React.FC<LoginProps> = () => {
	const status = useAppSelector(selectStatus);
	const dispatch = useAppDispatch();

	const [email, setEmail] = useState("");
	const [emailErr, setEmailErr] = useState("");
	const [pass, setPass] = useState("");

	let history = useHistory();

	function handleChange(val: string, type: "email" | "pass") {
		if (type === "email") {
			const valid = validate({ val, type: "email" });
			setEmailErr(valid);
			setEmail(val);
		} else {
			setPass(val);
		}
	}

	function handleSubmit() {
		dispatch(loginInit({ email, pass }));
	}

	return (
		<FormContainer pageTitle="LOGIN">
			<LabelledFormComponent
				labelText="Email"
				error={emailErr !== ""}
				errorText={emailErr}
			>
				<CustomInput
					type="email"
					containerStyle={{ margin: "5px 0px" }}
					backgroundColor="#ededed"
					placeholder="Email"
					className={styles.email}
					name="email"
					value={email}
					onChange={(e) => handleChange(e.target.value, "email")}
				/>
			</LabelledFormComponent>
			<LabelledFormComponent labelText="Password">
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
			<CustomButton
				isSecondary={true}
				size="small"
				text="Forgot Password?"
				onClick={() => history.push("/app/forgotPassword")}
			/>
			<CustomButton
				className={styles.button}
				type="primary"
				text={"Login"}
				loading={false}
				onClick={handleSubmit}
			/>
			<div className={styles.changeView}>
				New to Task Manager?
				<CustomButton
					isSecondary={true}
					size="small"
					text="Register"
					onClick={() => history.push("/app/register")}
				/>
			</div>
		</FormContainer>
	);
};
