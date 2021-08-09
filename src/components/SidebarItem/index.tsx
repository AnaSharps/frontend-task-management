import React from "react";
import { Skeleton, Card } from "antd";
import styles from "./style.module.css";
import { backgroundColor } from "../../app/constants";

export interface SidebarItemProps {
	loading?: boolean;
	vector?: string;
	text?: string;
	cardWidth?: number | string;
	notification?: string | undefined;
	selected?: boolean;
	onClick?: any;
}

export const SidebarItem: React.FC<SidebarItemProps> = ({
	loading = false,
	text = "",
	vector = "",
	cardWidth = "100%",
	notification = false,
	selected = false,
	onClick,
}) => {
	return (
		<div className={styles.cardContainer} style={{ width: cardWidth }}>
			<Card
				onClick={() => onClick()}
				style={{ background: selected ? "#fff" : "transparent" }}
			>
				<Skeleton loading={loading} avatar active paragraph={{ rows: 0 }}>
					{/* <span
            className={styles.img}
            style={{
              backgroundColor: "red",
              mask: `{url(${vector}) no-repeat center}`,
            }}
          >
            {" "}
          </span> */}
					{/* <img
						className={styles.img}
						alt=""
					/> */}
					<span
						className={styles.cardText}
						style={{
							color: selected ? backgroundColor : "#fff",
						}}
					>
						{text}
					</span>
					<span
						className={`${
							notification ? styles.notification : styles.notVisible
						}`}
						style={{
							background: selected ? backgroundColor : "#fff",
						}}
					>
						<span
							style={{
								color: !selected ? backgroundColor : "#fff",
							}}
						>
							{notification}
						</span>
					</span>
				</Skeleton>
			</Card>
		</div>
	);
};
