import React from "react";
import { useHistory } from "react-router";
import { useAppDispatch } from "../../app/hooks";
import { FormContainer } from "../../components/FormContainer";
import { FormEmail } from "../../components/FormEmail";
import { registrationInit } from "../../features/register";
import { sendVerify } from "../../features/verifyEmailSent";
import styles from "./style.module.css";

export interface SignupProps {}

export const Signup: React.FC<SignupProps> = () => {
	const history = useHistory();
	const dispatch = useAppDispatch();

	function handleSubmit(email: string) {
		dispatch(registrationInit(email));
	}

	return (
		<>
			<FormContainer pageTitle="REGISTER">
				<FormEmail
					resendEmailText="Resend Verification Email"
					onChangePage={() => history.push("/app/login")}
					onSubmit={handleSubmit}
					changePageText="Already a user?"
				></FormEmail>
			</FormContainer>
		</>
	);
};
