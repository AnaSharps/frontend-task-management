import { Card, CardProps } from "antd";
import React from "react";
import styles from "./style.module.css";

export interface CustomCardProps extends CardProps {}

export const CustomCard: React.FC<CustomCardProps> = ({ ...props }) => {
	return (
		<Card {...props} className={styles.card}>
			{props.children}
		</Card>
	);
};
