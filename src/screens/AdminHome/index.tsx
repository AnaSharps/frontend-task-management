import { Spin } from "antd";
import React, { useEffect, useState } from "react";
import { useHistory, useLocation } from "react-router";
import { Redirect, BrowserRouter as Router, Switch } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { authorizationInit, adminAuthInit } from "../../features/authorization";
import { selectAdminChanged, selectIsAdmin } from "../../features/isAdmin";
import { selectStatus } from "../../features/loading";
import { selectCurrUser, selectLoginChanged } from "../../features/login";
import styles from "./style.module.css";

export interface AdminHomeProps {}

export const AdminHome: React.FC<AdminHomeProps> = ({ ...props }) => {
	const history = useHistory();
	const location = useLocation();
	const dispatch = useAppDispatch();

	const currUser = useAppSelector(selectCurrUser);
	const [once, setOnce] = useState(true);

	useEffect(() => {
		if (once) {
			console.log("sending authorization");
			dispatch(authorizationInit());
			setOnce(false);
		} else {
			console.log("authorization done");
			if (currUser) {
				if (currUser.role === "NORMAL") {
					console.log("in admin home, i am normal");
					history.push("/home/dashboard");
				}
			} else {
				console.log(
					"in admin home, i am not logged in...redirection to app/login"
				);
				history.push("/app/login");
			}
		}
	}, [once, currUser]);

	return <>{!once && currUser?.role === "ADMIN" && props.children}</>;
};
