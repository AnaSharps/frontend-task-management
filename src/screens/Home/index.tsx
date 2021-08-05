import { Spin } from "antd";
import React, { useEffect, useState } from "react";
import { useHistory, useLocation } from "react-router";
import { Redirect, BrowserRouter as Router, Switch } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { authorizationInit } from "../../features/authorization";
import { selectStatus } from "../../features/loading";
import styles from "./style.module.css";

export interface HomeProps {
	admin?: boolean;
}

export const Home: React.FC<HomeProps> = ({ admin = false, ...props }) => {
	const history = useHistory();
	const location = useLocation();
	const dispatch = useAppDispatch();
	const status = useAppSelector(selectStatus);
	const [once, setOnce] = useState(true);

	useEffect(() => {
		if (once) {
			dispatch(authorizationInit(location.pathname));
			setOnce(false);
		}
	}, [once]);

	return (
		<>
			{once && status === "failed"
				? history.push("/app/login")
				: props.children}
		</>
	);
};
