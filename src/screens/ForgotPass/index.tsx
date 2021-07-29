import React, { useState } from "react";
import { useHistory } from "react-router";
import { useLocation } from "react-router-dom";
import { useAppDispatch } from "../../app/hooks";
import { FormContainer } from "../../components/FormContainer";
import { FormEmail } from "../../components/FormEmail";
import { forgotPassInit } from "../../features/forgotPAss";
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

	// useEffect(() => {
	// 	if (reset) {
	// 		dispatch(changePassword({ pass, token }));
	// 	}
	// 	if (!once) {
	// 		setOnce(true);
	// 		dispatch(authorizationInit("/home/loggedin"));
	// 	} else if (status === "passed") {
	// 		history.push("/home/loggedin");
	// 	} else if (status === "failed") {
	// 		setDisplay(true);
	// 	// }
	// }, [status]);

	return (
		<FormContainer pageTitle="FORGOT PASSWORD">
			<FormEmail
				resendEmailText="Resend Password Reset Email"
				onChangePage={() => {
					history.push("/login");
				}}
				onSubmit={handleSubmit}
				changePageText="Return to Login Page?"
			/>
		</FormContainer>
	);
};
