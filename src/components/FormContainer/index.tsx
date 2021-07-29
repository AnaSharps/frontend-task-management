import React from "react";
import styles from "./style.module.css";

export interface FormContainerProps {
	pageTitle: string;
}

export const FormContainer: React.FC<FormContainerProps> = ({
	pageTitle,
	...props
}) => {
	return (
		<div className={styles.mainContainer}>
			<span className={styles.header}>{pageTitle}</span>
			<div className={styles.container}>
				<form className={styles.formWrapper}>
					<div className={styles.formContainer}>{props.children}</div>
				</form>
			</div>
		</div>
	);
};
