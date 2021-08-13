import { message } from "antd";
import React, { useState } from "react";
import { useAppSelector } from "../../app/hooks";
import { validate } from "../../app/utils/validate";
import { selectStatus } from "../../features/loading";
import {
	selectPassLink,
	selectVerifySent,
} from "../../features/verifyEmailSent";
import { CustomButton } from "../Button";
import { CustomInput } from "../CustomInput";
import { LabelledFormComponent } from "../LabelledFormComponent";
import styles from "./style.module.css";

export interface FormEmailProps {
	resendEmailText: string;
	onChangePage: Function;
	onSubmit: Function;
	changePageText: string;
	pass?: boolean;
	showChangePage?: boolean;
}

export const FormEmail: React.FC<FormEmailProps> = ({
	resendEmailText,
	onChangePage,
	onSubmit,
	changePageText,
	pass = false,
	showChangePage = true,
}) => {
	const [email, setEmail] = useState("");
	const [emailErr, setEmailErr] = useState<string>("");

	const status = useAppSelector(selectStatus);
	const verifyEmail = useAppSelector(selectVerifySent);
	const sentPassLink = useAppSelector(selectPassLink);

	function handleChange(val: string) {
		setEmail(val);
		const valid = validate({ val, type: "email" });
		setEmailErr(valid);
	}

	function handleSubmit() {
		if (emailErr !== "") {
			message.error("Enter a valid email address");
		} else {
			console.log(email);
			onSubmit(email);
		}
	}

	return (
		<>
			<LabelledFormComponent labelText="Email">
				{emailErr !== "" && <div className={styles.err}>{emailErr}</div>}
				<CustomInput
					type="email"
					containerStyle={{ margin: "5px 0px" }}
					backgroundColor="#ededed"
					placeholder="Email"
					className={styles.email}
					name="email"
					value={email}
					defaultValue={email}
					onChange={(e) => handleChange(e.target.value)}
				/>
			</LabelledFormComponent>
			{!pass && verifyEmail && (
				<CustomButton
					isSecondary
					text={resendEmailText}
					onClick={() => onSubmit(email)}
				/>
			)}
			{pass && sentPassLink && (
				<CustomButton
					isSecondary
					text={resendEmailText}
					onClick={() => onSubmit(email)}
				/>
			)}
			<CustomButton
				className={styles.button}
				type="primary"
				text="Confirm Email"
				loading={status === "processing"}
				onClick={() => handleSubmit()}
			/>
			{showChangePage && (
				<div className={styles.changeView}>
					{changePageText}
					<CustomButton
						isSecondary={true}
						size="small"
						text="Login"
						onClick={() => onChangePage()}
					/>
				</div>
			)}
		</>
	);
};
