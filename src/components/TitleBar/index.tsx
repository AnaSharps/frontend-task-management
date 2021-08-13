import { PageHeader } from "antd";
import React from "react";
import styles from "./style.module.css";

export interface TitleBarProps {
	title?: string;
	onBack?: Function;
	blue?: boolean;
	white?: boolean;
	backAvatar?: string;
}

export const TitleBar: React.FC<TitleBarProps> = ({
	title = "",
	onBack = () => null,
	blue,
	white,
}) => {
	return (
		<PageHeader
			title={title}
			style={{ paddingInline: "16px", fontWeight: "bolder" }}
		/>
	);
};
