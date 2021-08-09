import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
// import React, { useState, useEffect, useCallback } from "react";
// import { useSpring } from "react-spring";
import type { RootState, AppDispatch } from "./store";

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

// export interface useBoopProps {
// 	x?: number;
// 	y?: number;
// 	rotation?: number;
// 	scale?: number;
// 	timing?: number;
// 	springConfig?: {
// 		tension: number;
// 		friction: number;
// 	};
// }

// export function useBoop<T>({
// 	x = 0,
// 	y = 0,
// 	rotation = 0,
// 	scale = 1,
// 	timing = 150,
// 	springConfig = {
// 		tension: 300,
// 		friction: 10,
// 	},
// }) {
// 	const [isBooped, setIsBooped] = useState(false);
// 	const style = useSpring({
// 		transform: isBooped
// 			? `translate(${x}px, ${y}px)
//          rotate(${rotation}deg)
//          scale(${scale})`
// 			: `translate(0px, 0px)
//          rotate(0deg)
//          scale(1)`,
// 		config: springConfig,
// 	});
// 	useEffect(() => {
// 		if (!isBooped) {
// 			return;
// 		}
// 		const timeoutId = window.setTimeout(() => {
// 			setIsBooped(false);
// 		}, timing);
// 		// eslint-disable-next-line consistent-return
// 		return () => window.clearTimeout(timeoutId);
// 	}, [isBooped]);
// 	// eslint-disable-next-line no-unused-vars
// 	const trigger = useCallback<React.MouseEventHandler<T>>((_e) => {
// 		setIsBooped(true);
// 	}, []);
// 	return { style, trigger };
// }
