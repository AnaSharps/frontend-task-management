import React, { useEffect, useState } from "react";
import { useHistory, useLocation } from "react-router";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { authorizationInit } from "../../features/authorization";
import { selectStatus } from "../../features/loading";
import { Spin } from "antd";
import styles from "./style.module.css";
import { BrowserRouter as Router, Redirect, Switch } from "react-router-dom";
import { RouteType, RouteWithSubRoutes } from "../../App";
import { selectLoginChanged } from "../../features/login";

export interface UnauthorisedFormsProps {
	routes?: RouteType[];
}

export const UnauthorisedForms: React.FC<UnauthorisedFormsProps> = ({
	routes,
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
