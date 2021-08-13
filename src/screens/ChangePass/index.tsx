import React, { useEffect, useState } from "react";
import { useHistory, useLocation } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { validate } from "../../app/utils/validate";
import { CustomInput } from "../../components/CustomInput";
import { FormContainer } from "../../components/FormContainer";
import { LabelledFormComponent } from "../../components/LabelledFormComponent";
import { SetPass } from "../../components/SetPass";
import { authorizationInit } from "../../features/authorization";
import { changePassInit, resetPassInit } from "../../features/forgotPAss";
import { selectStatus } from "../../features/loading";
import styles from "./style.module.css";

export interface ChangePassProps {
	forgot?: boolean;
}

export const ChangePass: React.FC<ChangePassProps> = ({ forgot = false }) => {
	const [pass, setPass] = useState("");
	const [passErr, setPassErr] = useState("");
	const [once, setOnce] = useState(false);
	const [submitted, setSubmitted] = useState(false);

	const status = useAppSelector(selectStatus);
	const dispatch = useAppDispatch();

	const history = useHistory();

	const location = useLocation();
	const token = location.search.split("=")[1];

	function handleChange(val: string) {
		const validP = validate({ val, type: "pass" });
		setPassErr(validP);
		setPass(val);
	}

	function handleSubmit(newPass: string) {
		console.log(newPass);
		if (forgot) {
			dispatch(resetPassInit(token, newPass));
		} else {
			dispatch(changePassInit(pass, newPass));
		}
		setSubmitted(true);
	}

	useEffect(() => {
		if (submitted && status === "passed") {
			history.push("/home/dashboard");
		}
	});

	return (
		<FormContainer pageTitle="CHANGE PASSWORD">
			{!forgot && (
				<LabelledFormComponent
					labelText="Current Password"
					error
					errorText={passErr}
				>
					<CustomInput
						backgroundColor="#ededed"
						containerStyle={{ margin: "5px 0px" }}
						placeholder="Confirm Password"
						type="password"
						className={styles.passwordInput}
						name="confirm-password"
						value={pass}
						onChange={(e) => handleChange(e.target.value)}
					/>
				</LabelledFormComponent>
			)}
			<SetPass onSubmit={handleSubmit} />
		</FormContainer>
	);
};
