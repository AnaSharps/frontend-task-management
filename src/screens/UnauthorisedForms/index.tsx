import React, { useEffect, useState } from "react";
import { useHistory } from "react-router";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { authorizationInit } from "../../features/authorization";
import { selectStatus } from "../../features/loading";
import styles from "./style.module.css";
import { selectLoginChanged } from "../../features/login";

export interface UnauthorisedFormsProps {}

export const UnauthorisedForms: React.FC<UnauthorisedFormsProps> = ({
	...props
}) => {
	const [once, setOnce] = useState(true);

	const status = useAppSelector(selectStatus);
	const loginChanged = useAppSelector(selectLoginChanged);
	const dispatch = useAppDispatch();
	// const location = useLocation();
	const history = useHistory();

	useEffect(() => {
		console.log(once);
		console.log(loginChanged);
		if (once || loginChanged) {
			console.log("hiii");
			dispatch(authorizationInit("/home/loggedin"));
			setOnce(false);
		}
	}, [once, loginChanged]);

	return (
		<>
			{/* {status === "processing" && <Spin />} */}
			{(once || loginChanged) && status === "passed"
				? history.push("/home/loggedin")
				: props.children}
		</>
	);
};
