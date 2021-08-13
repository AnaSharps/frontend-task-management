import React, { useState } from "react";
import { useHistory } from "react-router";
import { useLocation } from "react-router-dom";
import { useAppDispatch } from "../../app/hooks";
import { FormContainer } from "../../components/FormContainer";
import { FormEmail } from "../../components/FormEmail";
import { forgotPassInit } from "../../features/forgotPAss";
import { sendPassLink } from "../../features/verifyEmailSent";
import styles from "./style.module.css";

export interface ForgotPassProps {}

export const ForgotPass: React.FC<ForgotPassProps> = () => {
	const history = useHistory();
	const dispatch = useAppDispatch();

	const location = useLocation();
	const token = location.search.split("=")[1];

	const [once, setOnce] = useState(false);
	const [display, setDisplay] = useState(false);

	function handleSubmit(email: string) {
		dispatch(forgotPassInit({ email }));
	}

	return (
		<FormContainer pageTitle="FORGOT PASSWORD">
			<FormEmail
				resendEmailText="Resend Password Reset Email"
				onChangePage={() => {
					history.push("/app/login");
				}}
				onSubmit={handleSubmit}
				changePageText="Return to Login Page?"
				pass
			/>
		</FormContainer>
	);
};
