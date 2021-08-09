import React, { useEffect, useState } from "react";
import { useHistory } from "react-router";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { adminAuthInit, authorizationInit } from "../../features/authorization";
import { selectStatus } from "../../features/loading";
import styles from "./style.module.css";
import { selectLoginChanged } from "../../features/login";
import { selectAdminChanged, selectIsAdmin } from "../../features/isAdmin";

export interface UnauthorisedFormsProps {}

export const UnauthorisedForms: React.FC<UnauthorisedFormsProps> = ({
	...props
}) => {
	const [once, setOnce] = useState(true);

	const status = useAppSelector(selectStatus);
	const loginChanged = useAppSelector(selectLoginChanged);
	const adminChanged = useAppSelector(selectAdminChanged);
	const isAdmin = useAppSelector(selectIsAdmin);

	const dispatch = useAppDispatch();
	// const location = useLocation();
	const history = useHistory();

	useEffect(() => {
		console.log(once);
		console.log(loginChanged);
		if (once || loginChanged || adminChanged) {
			if (isAdmin) {
				console.log("admin at form");
				dispatch(adminAuthInit());
				setOnce(false);
			} else {
				console.log("normal at form");
				dispatch(authorizationInit());
				setOnce(false);
			}
		}
	}, [once, loginChanged, isAdmin, adminChanged]);

	return (
		<>
			{/* {status === "processing" && <Spin />} */}
			{(once || loginChanged || adminChanged) && status === "passed"
				? isAdmin
					? history.push("/admin/loggedin")
					: history.push("/home/loggedin")
				: props.children}
		</>
	);
};
