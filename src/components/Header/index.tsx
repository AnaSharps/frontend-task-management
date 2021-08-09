/* eslint-disable no-unused-vars */
import React from "react";
import styles from "./style.module.css";
import { backgroundColor } from "../../app/constants";
import { Layout } from "antd";
import { useAppDispatch } from "../../app/hooks";
import { logoutInit } from "../../features/login";
import { TitleBar } from "../TitleBar";
import { LeftOutlined } from "@ant-design/icons";

export interface HeaderProps {
	title?: string;
	searchBar?: boolean;
	onSearch?: React.MouseEventHandler<HTMLElement>;
	onBack?: React.MouseEventHandler<HTMLElement>;
}

export const Header: React.FC<HeaderProps> = ({
	title,
	searchBar,
	onSearch = () => null,
	onBack = () => null,
}) => {
	const dispatch = useAppDispatch();

	function logout() {
		dispatch(logoutInit());
	}

	return (
		<Layout.Header className={styles.container}>
			<div className={styles.headerRow}>
				<span
					className={styles.back}
					onClick={onBack}
					role="button"
					tabIndex={0}
					onKeyDown={() => null}
				>
					<LeftOutlined />
				</span>
				<TitleBar title={title} />
				<span
					className={styles.account}
					onClick={logout}
					role="button"
					tabIndex={0}
					onKeyDown={() => null}
				>
					Logout
					{/* <CustomButton isSecondary={false} text="Logout" onClick={logout} /> */}
				</span>
			</div>
			{/* {searchBar && searchComponent} */}
		</Layout.Header>
	);
};
