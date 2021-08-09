/* eslint-disable no-unused-vars */
import React, { MouseEventHandler } from "react";
import { Tag } from "antd";
import { AntdIconProps } from "@ant-design/icons/lib/components/AntdIcon";
import Color from "color";
import classnames from "classnames";
import styles from "./style.module.css";

export interface CustomTagProps {
	icon?: AntdIconProps | null;
	text?: string | false;
	defaultColor?:
		| "magenta"
		| "red"
		| "volcano"
		| "orange"
		| "gold"
		| "lime"
		| "green"
		| "cyan"
		| "blue"
		| "geekblue"
		| "purple"
		| undefined;
	customColor?: string;
	size?: number;
	fill?: boolean;
	textColor?: string;
	noBorder?: boolean;
	leads?: boolean;
	onSelect?: MouseEventHandler;
	className?: string;
}

export const CustomTag: React.FC<CustomTagProps> = ({
	defaultColor = undefined,
	text = "",
	icon = undefined,
	customColor = "rgba(48, 0, 156)",
	size = 14,
	fill = false,
	textColor = customColor,
	noBorder = false,
	leads = false,
	onSelect,
	className = "",
}) => {
	const getPadding = (s: number) => {
		if (size >= 12) return "6px 12px";
		if (size < 8) return "0px 12px";
		return "2px 12px";
	};
	const customStyling = {
		border: noBorder ? "0px" : `${leads ? "2" : "1"}px solid ${customColor}`,
		color: textColor,
		background: fill ? Color(customColor).alpha(0.1) : "transparent",
	};

	const sizeStyling = {
		fontSize: `${size}px`,
		padding: getPadding(size),
		borderRadius: `${size * 2}px`,
	};

	return (
		<Tag
			className={classnames(
				`${icon ? styles.tagWithIcon : styles.tag}`,
				className
			)}
			style={defaultColor ? sizeStyling : { ...customStyling, ...sizeStyling }}
			color={defaultColor}
			icon={icon}
			onClick={onSelect}
		>
			{text}
		</Tag>
	);
};
