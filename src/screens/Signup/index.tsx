import React, { useEffect, useState } from "react";
import { useHistory } from "react-router";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { validate } from "../../app/utils/validate";
import { CustomButton } from "../../components/Button";
import { CustomInput } from "../../components/CustomInput";
import { FormContainer } from "../../components/FormContainer";
import { FormEmail } from "../../components/FormEmail";
import { LabelledFormComponent } from "../../components/LabelledFormComponent";
import { authorizationInit } from "../../features/authorization";
import { selectStatus } from "../../features/loading";
import { registrationInit } from "../../features/register";
import { selectVerifySent } from "../../features/verifyEmailSent";
import styles from "./style.module.css";

export interface SignupProps {}

export const Signup: React.FC<SignupProps> = () => {
	const history = useHistory();
	const dispatch = useAppDispatch();

	const [email, setEmail] = useState("");
	const [emailErr, setEmailErr] = useState("");
	const [once, setOnce] = useState(false);
	const [display, setDisplay] = useState(false);

	const status = useAppSelector(selectStatus);
	const verifyEmail = useAppSelector(selectVerifySent);

	function handleChange(val: string) {
		const valid = validate({ val, type: "email" });
		setEmailErr(valid);
		setEmail(val);
	}

	function handleSubmit() {
		dispatch(registrationInit(email));
	}

	useEffect(() => {
		if (!once) {
			setOnce(true);
			// dispatch(authorizationInit("/admin/loggedin", "/home/loggedin"));
			dispatch(authorizationInit("/home/loggedin"));
		} else if (status === "passed") {
			history.push("/home/loggedin");
		} else if (status === "failed") {
			setDisplay(true);
		}
	}, [status]);

	return (
		<>
			{display && (
				<FormContainer pageTitle="REGISTER">
					<FormEmail
						resendEmailText="Resend Verification Email"
						onChangePage={() => history.push("/login")}
						onSubmit={handleSubmit}
						changePageText="Already a user?"
					></FormEmail>
				</FormContainer>
			)}
		</>
	);
};
