/* eslint-disable no-unused-vars */
/* eslint-disable no-console */
import React, { useEffect, useState } from "react";
import { Layout, Button, Avatar } from "antd";
import { useHistory, useLocation, useRouteMatch } from "react-router-dom";
import { SidebarItem } from "../SidebarItem";
import styles from "./style.module.css";
import { backgroundColor, routesData } from "../../app/constants";
import { UserOutlined } from "@ant-design/icons";
import { useAppSelector } from "../../app/hooks";
import { selectCurrUser } from "../../features/login";

const { Sider, Content } = Layout;

export interface NavbarProps {
	navItems?: { text: string; notification?: string }[];
	collapsed?: boolean;
}

export const Navbar: React.FC<NavbarProps> = ({
	collapsed = false,
	navItems = [],
}) => {
	const match = useRouteMatch();
	const history = useHistory();
	const currUser = useAppSelector(selectCurrUser);
	const location = useLocation();

	const [activeIndex, setActiveIndex] = useState<null | number>(null);
	const [account, setAccount] = useState(false);

	const onClickHandeler = (idx: number) => {
		setActiveIndex(idx);
		setAccount(false);
		history.push(`/${Object.keys(routesData)[idx]}`);
	};

	useEffect(() => {
		const regexp = new RegExp("^/([a-zA-Z]*)");
		const group = regexp.exec(match.path);
		if (group && group[1] === "admin") {
			const acc = location.pathname.split("/")[2];
			console.log(acc);
			if (acc === "account") {
				setAccount(true);
			}
		} else if (group && group[1]) {
			setActiveIndex(routesData[group[1]]);
			setAccount(false);
		}
	}, []);

	return (
		<Sider
			className={styles.sider}
			width="240px"
			collapsedWidth="0"
			collapsed={collapsed}
			style={{
				position: "initial",
				top: 0,
				left: 0,
				overflow: "auto",
				height: "100vh",
			}}
		>
			<div className={styles.listMenu}>
				<div
					style={{
						display: "flex",
						flexDirection: "column",
						width: "100%",
						alignItems: "center",
						justifyContent: "center",
						backgroundColor: account ? "white" : "none",
					}}
					onClick={() =>
						currUser?.role === "ADMIN"
							? history.push("/admin/account")
							: history.push("/home/account")
					}
				>
					<Avatar
						size={100}
						style={{
							color: account ? "white" : "black",
							backgroundColor: account ? backgroundColor : "white",
							display: "flex",
							alignItems: "center",
							justifyContent: "center",
							borderRadius: "50px",
						}}
						icon={<UserOutlined />}
					/>
					<div
						style={{
							color: account ? backgroundColor : "white",
							fontWeight: "bolder",
							fontSize: "24px",
							padding: "10px",
						}}
					>
						{currUser?.name}
					</div>
				</div>
				<span
					style={{
						width: "100%",
						height: "2px",
						backgroundColor: "white",
					}}
				/>
				{navItems.map(
					(
						Item: {
							text: string;
							notification?: string;
						},
						index: number
					) => {
						return (
							<SidebarItem
								onClick={() => onClickHandeler(index)}
								key={Item.text}
								text={Item.text}
								notification={Item.notification}
								selected={activeIndex === index}
							/>
						);
					}
				)}
			</div>
		</Sider>
	);
};
