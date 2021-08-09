/* eslint-disable no-unused-vars */
import React from "react";
import { Layout } from "antd";
import { useHistory } from "react-router-dom";
import { Header, HeaderProps } from "../Header";
import styles from "./style.module.css";
import { Navbar } from "../Sidebar";

const { Content, Footer } = Layout;

export interface MainContainerProps {
	content: React.ReactNode;
	title?: HeaderProps["title"];
	searchBar?: HeaderProps["searchBar"];
	onSearch?: HeaderProps["onSearch"];
	backString?: string;
}

const navItems = [{ text: "Dashboard" }, { text: "Tasks" }, { text: "Users" }];

export const MainContainer: React.FC<MainContainerProps> = ({
	content,
	title,
	searchBar,
	onSearch,
}) => {
	const history = useHistory();

	const handelBackClick = () => {
		history.goBack();
	};

	return (
		<div style={{ height: "100%" }}>
			<Layout className={styles.container}>
				<Navbar navItems={navItems} />
				<Layout style={{ width: "100%", height: "100%" }}>
					<Header
						title={title}
						searchBar={searchBar}
						onSearch={onSearch}
						onBack={() => handelBackClick()}
					/>
					<Content className={styles.contentContainer}>{content}</Content>
				</Layout>
			</Layout>
			{/* {loading && <LoadingSpinner visible={loading} />} */}
		</div>
	);
};
