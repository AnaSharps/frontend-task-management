import React from "react";
import { useAppSelector, useAppDispatch } from "../../app/hooks";
import {
	selectSearch,
	selectOffset,
	selectDisplayNum,
	setSearch,
	setOffset,
	getUsersInit,
} from "../../features/users";
import { CustomButton } from "../Button";
import { CustomInput } from "../CustomInput";

export const SearchUsersComponent: React.FC = () => {
	const search = useAppSelector(selectSearch);
	const ofset = useAppSelector(selectOffset);
	const display = useAppSelector(selectDisplayNum);
	const dispatch = useAppDispatch();

	function handleChange(val: string) {
		dispatch(setSearch(val));
	}
	function searchUsers(viewNext: number = 0) {
		if (viewNext === 1) dispatch(setOffset(ofset + display));
		else if (viewNext === -1) dispatch(setOffset(ofset - display));
		dispatch(getUsersInit());
	}

	return (
		<div style={{ display: "flex" }}>
			<CustomInput
				placeholder={"Search"}
				type="text"
				value={search ? search : ""}
				backgroundColor="white"
				onChange={(e) => handleChange(e.target.value)}
			/>
			<CustomButton
				onClick={() => searchUsers()}
				text="Search"
				isSecondary={false}
			/>
		</div>
	);
};
