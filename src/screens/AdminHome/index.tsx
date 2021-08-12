import { Spin } from "antd";
import React, { useEffect, useState } from "react";
import { useHistory, useLocation } from "react-router";
import { Redirect, BrowserRouter as Router, Switch } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { authorizationInit, adminAuthInit } from "../../features/authorization";
import { selectAdminChanged, selectIsAdmin } from "../../features/isAdmin";
import { selectStatus } from "../../features/loading";
import {
	selectCurrUser,
	selectLoginChanged,
	selectLoginStatus,
} from "../../features/login";
import styles from "./style.module.css";

export interface AdminHomeProps {}

export const AdminHome: React.FC<AdminHomeProps> = ({ ...props }) => {
	const history = useHistory();
	const location = useLocation();
	const dispatch = useAppDispatch();

	const currUser = useAppSelector(selectCurrUser);
	const loginStatus = useAppSelector(selectLoginStatus);
	const [once, setOnce] = useState(true);

	useEffect(() => {
		if (once) {
			console.log("sending authorization");
			dispatch(authorizationInit());
			setOnce(false);
		} else {
			if (currUser && currUser.role === "NORMAL" && loginStatus === "passed")
				history.push("/home/loggedin");
			else if (!currUser && loginStatus === "passed")
				history.push("/app/login");
		}
	}, [currUser, loginStatus]);

	return <>{!once && currUser?.role === "ADMIN" && props.children}</>;
};
