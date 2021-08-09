import { SearchOutlined } from "@ant-design/icons";
import React from "react";
import { useHistory } from "react-router-dom";
import { useAppSelector, useAppDispatch } from "../../app/hooks";
import { selectCurrUser } from "../../features/login";
import {
	selectSearch,
	selectOffset,
	selectDisplayNum,
	setSearch,
	setOffset,
	getUsersInit,
	selectUserList,
	selectTotalCount,
} from "../../features/users";
import { CustomButton } from "../Button";
import { CustomInput } from "../CustomInput";

export const SearchUsersComponent: React.FC = () => {
	const search = useAppSelector(selectSearch);
	const ofset = useAppSelector(selectOffset);
	const display = useAppSelector(selectDisplayNum);
	const total = useAppSelector(selectTotalCount);
	const currUser = useAppSelector(selectCurrUser);

	const dispatch = useAppDispatch();

	const history = useHistory();

	function handleChange(val: string) {
		dispatch(setSearch(val));
	}
	function searchUsers(viewNext: number = 0) {
		if (viewNext === 1) dispatch(setOffset(ofset + display));
		else if (viewNext === -1) dispatch(setOffset(ofset - display));
		dispatch(getUsersInit());
	}
	function addUser() {
		history.push("/admin/addUser");
	}

	return (
		<div style={{ display: "flex", flexDirection: "column" }}>
			<div
				style={{
					display: "flex",
					paddingBottom: "5px",
					borderBottom: "2px solid grey",
				}}
			>
				<span style={{ display: "flex", flexGrow: 1 }}>Total: {total}</span>
				{currUser?.role === "ADMIN" && (
					<CustomButton text="Add User" onClick={addUser} />
				)}
			</div>
			{/* <div style={{ backgroundColor: "black", height: }}/> */}
			<div style={{ display: "flex", paddingTop: "10px" }}>
				<CustomInput
					placeholder={"Search name or email..."}
					type="text"
					value={search ? search : ""}
					backgroundColor="white"
					onChange={(e) => handleChange(e.target.value)}
					width="50%"
				/>
				<CustomButton
					onClick={() => searchUsers()}
					prefixIcon={<SearchOutlined />}
					isSecondary={false}
					style={{ zIndex: 999, flexGrow: 1 }}
					// style={{ alignSelf }}
				/>
			</div>
		</div>
	);
};
