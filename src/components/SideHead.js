/** @format */

import * as React from "react";
import { useState } from "react";
import { Stack, Chip, Box } from "@mui/material";
import logo from "../assets/logo.png";
import styled from "styled-components";
import SearchBar from "./Search/SearchBar.js";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import DaumPostcode from "react-daum-postcode";
import Modal from "@mui/material/Modal";
import { styled as muiStyled } from "@mui/material/styles";

const Header = styled.div`
	background-color: #fff;
`;

const HeadInner = styled.div`
	width: 90%;
	margin: auto;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;

	& img {
		padding-top: 5vh;
		padding-bottom: 2vh;
		width: 90%;
	}

	@media (max-width: 768px) {
		align-items: flex-start;
		& img {
			padding-top: 3vh;
			padding-bottom: 1vh;
			padding-left: 8%;
			width: 80%;
		}
	}
`;
const Chips = styled.div`
	display: flex;
	justify-content: space-between;
	width: 90%;
	height: 5rem;
`;

const StyledChip = muiStyled(Chip)(({ theme }) => ({
	fontSize: "1.2rem",
	fontWeight: 700,
	height: "30px", // Chip 높이 조정
	"& .MuiChip-label": {
		padding: "0 10px", // 텍스트 패딩 조정
	},
}));

function SideHead({ setAddress }) {
	// const [open, setOpen] = useState(false);
	const [searchHistory, setSearchHistory] = useState([]);
	const [anchorEl, setAnchorEl] = React.useState(null);
	const [zipcode, setZipCode] = useState("");
	const open = Boolean(anchorEl);
	const [openAddressSearch, setOpenAddressSearch] = useState(false);
	const [clickedSearch, setClickedSearch] = useState("");

	const closeAddressSearch = () => setOpenAddressSearch(false);

	const handleClick = (event) => {
		setAnchorEl(event.currentTarget);
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

	const handleClose = () => {
		setAnchorEl(null);
	};

	const searchHistoryHandleClick = (event) => {
		console.log(event.currentTarget);
		setClickedSearch(event.currentTarget);
		setAnchorEl(null);
		// setOpenAddressSearch(true);
	};

	const handleAddress = (data) => {
		const { address, zonecode } = data;
		setZipCode(zonecode);
		setAddress(address);
		setSearchHistory((searchHis) => [...searchHis, address]);
		handleClose();
	};

	return (
		<Header>
			<HeadInner>
				<img src={logo} className="logo" alt="logo" />
				<SearchBar
					setAddress={setAddress}
					setSearchHistory={setSearchHistory}
				/>
				<Chips>
					<Stack direction="row" spacing={1}>
						<StyledChip
							label="CCTV"
							color="primary"
							variant="outlined"
							onClick={handleClick}
						/>
						<StyledChip
							label="보안등"
							color="primary"
							variant="outlined"
							onClick={handleClick}
						/>
						<StyledChip
							label="거리"
							color="primary"
							variant="outlined"
							onClick={handleClick}
						/>
					</Stack>
					<Stack direction="row" spacing={1}>
						<StyledChip
							label="검색 히스토리"
							onClick={handleClick}
							sx={{
								color: "#fff",
								backgroundColor: "#1976d2",
								borderRadius: "2rem",
							}}
						/>
						<Menu
							id="basic-menu"
							anchorEl={anchorEl}
							open={open}
							onClose={handleClose}
							MenuListProps={{
								"aria-labelledby": "basic-button",
							}}
						>
							{searchHistory.length > 0 ? (
								searchHistory.map((children, search) => {
									return (
										<MenuItem
											className="item_place"
											style={{ fontSize: "1.3rem" }}
											aria-label="최근검색"
											onClick={searchHistoryHandleClick}
										>
											{children}
										</MenuItem>
									);
								})
							) : (
								<MenuItem onClick={handleClose}>
									검색한 기록이 없습니다
								</MenuItem>
							)}
						</Menu>
					</Stack>
				</Chips>
				{/* <Modal open={openAddressSearch} onClose={closeAddressSearch}>
          <Box sx={style}>
            <DaumPostcode onComplete={handleAddress} />
          </Box>
        </Modal> */}
			</HeadInner>
		</Header>
	);
}

export default SideHead;
