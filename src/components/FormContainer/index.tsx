import classNames from "classnames";
import React from "react";
import styles from "./style.module.css";

export interface FormContainerProps {
	pageTitle?: string;
	formWrapperClassName?: string;
}

export const FormContainer: React.FC<FormContainerProps> = ({
	pageTitle,
	formWrapperClassName,
	...props
}) => {
	return (
		<div className={styles.mainContainer}>
			{pageTitle && <span className={styles.header}>{pageTitle}</span>}
			<div className={styles.container}>
				<form className={classNames(styles.formWrapper, formWrapperClassName)}>
					<div className={styles.formContainer}>{props.children}</div>
				</form>
			</div>
		</div>
	);
};
