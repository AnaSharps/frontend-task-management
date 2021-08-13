import React from "react";
import { useHistory } from "react-router";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { FormContainer } from "../../components/FormContainer";
import { FormEmail } from "../../components/FormEmail";
import { selectCurrUser } from "../../features/login";
import { addUserInit, registrationInit } from "../../features/register";
import { sendVerify } from "../../features/verifyEmailSent";
import styles from "./style.module.css";

export interface SignupProps {
	admin?: boolean;
}

export const Signup: React.FC<SignupProps> = ({ admin = false }) => {
	const history = useHistory();
	const dispatch = useAppDispatch();

	const currUser = useAppSelector(selectCurrUser);

	function handleSubmit(email: string) {
		console.log("handling now", email);
		if (admin || currUser?.role === "ADMIN") {
			dispatch(addUserInit(email));
		} else {
			dispatch(registrationInit(email));
		}
	}

	return (
		<>
			<FormContainer pageTitle="REGISTER">
				<FormEmail
					resendEmailText="Resend Verification Email"
					onChangePage={() => history.push("/app/login")}
					onSubmit={handleSubmit}
					showChangePage={!admin && currUser?.role !== "ADMIN"}
					changePageText="Already a user?"
				></FormEmail>
			</FormContainer>
		</>
	);
};
