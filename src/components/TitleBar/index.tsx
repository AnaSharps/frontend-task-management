import { LeftOutlined } from "@ant-design/icons";
import { PageHeader } from "antd";
import React from "react";
// import { animated } from "react-spring";
// import { useBoop } from "../../app/hooks";
import styles from "./style.module.css";

export interface TitleBarProps {
	title?: string;
	onBack?: Function;
	blue?: boolean;
	white?: boolean;
	backAvatar?: string;
}

// const BackButton: React.FC<{}> = () => {
// 	// const { style, trigger } = useBoop<HTMLSpanElement>({ x: -2 });
// 	return (
// 		// <animated.span style={style} onMouseEnter={trigger}>
// 		<LeftOutlined />
// 		// </animated.span>
// 	);
// };

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
