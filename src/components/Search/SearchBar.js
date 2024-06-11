/** @format */

import React, { useState } from "react";
import DaumPostcode from "react-daum-postcode";
import styled from "styled-components";
import Paper from "@mui/material/Paper";
import InputBase from "@mui/material/InputBase";
import IconButton from "@mui/material/IconButton";
import Modal from "@mui/material/Modal";
import SearchIcon from "@mui/icons-material/Search";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

const { kakao } = window;

const InputContainer = styled.div`
	width: 100%;
	text-align: center;
`;

const Input = styled.input`
	margin: 5vh auto 5vh;
	width: 85%;
	height: 4vh;
	border-radius: 2.5rem;
	border: 3px solid #004aad;
`;
const RemoveIcon = styled.span``;

// function SearchBar({ onAddAddress, onInputClick }) {
// 	const [address, setAddress] = useState("");

// 	const handleAddress = (e) => {
// 		setAddress(e.target.value);
// 	};

// 	// address 추가 후 입력 필드를 초기화
// 	const handleEnter = (e) => {
// 		//Enter 키가 눌렸는지 확인
// 		if (address && e.keyCode === 13) {
// 			onAddAddress(address);
// 			setAddress("");
// 		}
// 	};

// 	const handleClearAddress = () => {
// 		setAddress("");
// 	};

// 	// boolean 값으로 변경
// 	const hasAddress = !!address;

// 	return (
// 		<>
// 			<InputContainer>
// 				<Input
// 					placeholer="주소를 입력해주세요"
// 					active={hasAddress}
// 					value={address}
// 					onChange={handleAddress}
// 					onKeyDown={handleEnter}
// 					onClick={onInputClick} // 검색 히스토리 보여줌
// 				/>
// 				{address && <RemoveIcon onClick={handleClearAddress}>❌</RemoveIcon>}
// 			</InputContainer>
// 		</>
// 	);
// }

export default function CustomizedInputBase({ setAddress }) {
	const [zipcode, setZipCode] = useState("");
	// const [address, setAddress] = useState("");
	const [open, setOpen] = React.useState(false);
	const handleOpen = () => setOpen(true);
	const handleClose = () => {
		setOpen(false);
	};

	const style = {
		position: "absolute",
		top: "50%",
		left: "50%",
		transform: "translate(-50%, -50%)",
		width: 400,
		bgcolor: "background.paper",
		border: "2px solid #316BFF",
		boxShadow: 24,
		p: 4,
	};

	const handleAddress = (data) => {
		const { address, zonecode } = data;
		setZipCode(zonecode);
		setAddress(address);
		console.log("address", address);
		console.log("zipcode:", zonecode);
		handleClose();
	};

	return (
		<div style={{ width: "100%", padding: "1rem" }}>
			<Paper
				component="form"
				sx={{
					margin: "1.5rem 0",
					p: "2px 4px",
					display: "flex",
					alignItems: "center",
					width: "100%",
					border: 2,
					borderColor: "#316BFF",
					borderRadius: 3,
				}}
			>
				<InputBase
					sx={{ ml: 1, flex: 1 }}
					placeholder="장소, 버스, 지하철 도로 검색"
					inputProps={{ "aria-label": "search google maps" }}
					onClick={handleOpen}
				/>
				<IconButton
					type="button"
					sx={{ p: "10px", color: "#004AAD" }}
					aria-label="search"
				>
					<SearchIcon />
				</IconButton>
			</Paper>
			<Modal open={open} onClose={handleClose}>
				<Box sx={style}>
					<DaumPostcode onComplete={handleAddress} />
				</Box>
			</Modal>
		</div>
	);
}
