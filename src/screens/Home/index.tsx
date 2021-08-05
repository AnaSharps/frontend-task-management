import { Spin } from "antd";
import React, { useEffect, useState } from "react";
import { useHistory, useLocation } from "react-router";
import { Redirect, BrowserRouter as Router, Switch } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { authorizationInit, adminAuthInit } from "../../features/authorization";
import { selectAdminChanged, selectIsAdmin } from "../../features/isAdmin";
import { selectStatus } from "../../features/loading";
import { selectLoginChanged } from "../../features/login";
import styles from "./style.module.css";

export interface HomeProps {
	admin?: boolean;
}

export const Home: React.FC<HomeProps> = ({ admin, ...props }) => {
	const history = useHistory();
	const location = useLocation();
	const dispatch = useAppDispatch();
	const status = useAppSelector(selectStatus);
	const loginchanged = useAppSelector(selectLoginChanged);
	const adminChanged = useAppSelector(selectAdminChanged);
	const isAdmin = useAppSelector(selectIsAdmin);

	const [once, setOnce] = useState(true);

	useEffect(() => {
		if (once || loginchanged || adminChanged) {
			if (admin || isAdmin) {
				console.log("admin here");
				dispatch(adminAuthInit());
				setOnce(false);
			} else {
				console.log("normal here");
				dispatch(authorizationInit());
				setOnce(false);
			}
		}
	}, [once, loginchanged, adminChanged]);

	return (
		<>
			{(once || loginchanged || adminChanged) && status === "failed"
				? history.push("/app/login")
				: props.children}
		</>
	);
};
