import React, { useState } from "react";
import { validate } from "../../app/utils/validate";
import { CustomButton } from "../Button";
import { CustomInput } from "../CustomInput";
import { LabelledFormComponent } from "../LabelledFormComponent";
import styles from "./style.module.css";

export interface SetPassProps {
	onSubmit: Function;
}

export const SetPass: React.FC<SetPassProps> = ({ onSubmit }) => {
	const [pass, setPass] = useState("");
	const [confirmPass, setConfirmPass] = useState("");

	const [passErr, setPassErr] = useState("");
	const [confirmPassErr, setConfirmPassErr] = useState("");

	function handleChange(val: string, type: "pass" | "confirmPass") {
		switch (type) {
			case "pass":
				setPass(val);
				const validP = validate({ val, type: "pass" });
				setPassErr(validP);
				break;
			case "confirmPass":
				setConfirmPass(val);
				if (val !== pass) {
					setConfirmPassErr("Passwords do not match!");
				} else setConfirmPassErr("");
				break;
		}
	}

	return (
		<>
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
				onClick={() => onSubmit(pass)}
			/>
		</>
	);
};
