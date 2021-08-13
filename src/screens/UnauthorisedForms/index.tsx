import React, { useEffect, useState } from "react";
import { useHistory } from "react-router";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { adminAuthInit, authorizationInit } from "../../features/authorization";
import { selectStatus } from "../../features/loading";
import styles from "./style.module.css";
import { selectCurrUser, selectLoginChanged } from "../../features/login";
import { selectAdminChanged, selectIsAdmin } from "../../features/isAdmin";

export interface UnauthorisedFormsProps {}

export const UnauthorisedForms: React.FC<UnauthorisedFormsProps> = ({
	...props
}) => {
	const [once, setOnce] = useState(true);

	const currUser = useAppSelector(selectCurrUser);

	const dispatch = useAppDispatch();
	const history = useHistory();

	useEffect(() => {
		if (once) {
			dispatch(authorizationInit());
			setOnce(false);
		} else {
			if (currUser) {
				if (currUser.role === "ADMIN") history.push("/admin/dashboard");
				else history.push("/home/dashboard");
			}
		}
	}, [currUser]);

	return <>{!once && !currUser && props.children}</>;
};
