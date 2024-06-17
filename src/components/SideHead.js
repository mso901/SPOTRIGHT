/** @format */

import * as React from "react";
import { useState } from "react";
import { Stack, Chip, Box } from "@mui/material";
import logo from "../assets/logo.png";
import styled from "styled-components";
import SearchBar from "./Search/SearchBar.js";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import DaumPostcode from "react-daum-postcode";
import Modal from "@mui/material/Modal";

const Header = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;

	& img {
		padding-top: 5vh;
		width: 80%;
	}

	@media (max-width: 768px) {
		align-items: flex-start;
		& img {
			padding-left: 8%;
			width: 50%;
		}
	}
`;

const ChipWrapper = styled.div`
	position: relative;
	display: inline-block;
`;

function SideHead({ setAddress }) {
	// const [open, setOpen] = useState(false);
	const [searchHistory, setSearchHistory] = useState([]);
	const [anchorEl, setAnchorEl] = React.useState(null);
	const [zipcode, setZipCode] = useState("");
	const open = Boolean(anchorEl);

	const [openAddressSearch, setOpenAddressSearch] = useState(false);

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

	const searchHistoryHandleClose = () => {
		setAnchorEl(null);
		setOpenAddressSearch(true);
	};

	const handleAddress = (data) => {
		const { address, zonecode } = data;
		setZipCode(zonecode);
		setAddress(address);
		setSearchHistory((searchHis) => [...searchHis, address]);
		// console.log("address", address);
		// console.log("zipcode:", zonecode);
		handleClose();
	};

	return (
		<Header>
			<img src={logo} className="logo" alt="logo" />
			<SearchBar setAddress={setAddress} setSearchHistory={setSearchHistory} />
			<Stack
				direction="row"
				spacing={1}
				justifyContent="flex-end"
				alignItems="flex-start"
				sx={{ width: "100%", height: "5rem", paddingRight: "2rem" }}
			>
				<Chip
					label="검색 히스토리"
					onClick={handleClick}
					sx={{
						fontSize: "1rem",
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
									onClick={searchHistoryHandleClose}
								>
									{children}
								</MenuItem>
							);
						})
					) : (
						<MenuItem onClick={handleClose}>검색한 기록이 없습니다</MenuItem>
					)}
				</Menu>
			</Stack>
			<Modal open={openAddressSearch} onClose={closeAddressSearch}>
				<Box sx={style}>
					<DaumPostcode onComplete={handleAddress} />
				</Box>
			</Modal>
		</Header>
	);
}

export default SideHead;

/* <ChipWrapper>
	<Chip label="검색히스토리" color="primary" onClick={handleClick} />
	{open && (
		<Box
			sx={{
				width: 300,
				height: "auto",
				backgroundColor: "#fff",
				position: "absolute",
				zIndex: 10,
				top: "30px",
				right: "-20px",
				border: "1px solid grey",
				borderRadius: "4px",
				boxShadow: 3,
				p: 2,
			}}
		>
			{
				<ul className="search-history">
					{searchHistory.length > 0 ? (
						searchHistory.map((children, search) => {
							return (
								<li
									className="item_place"
									style={{ fontSize: "1.3rem" }}
									aria-label="최근검색"
								>
									{children}
								</li>
							);
						})
					) : (
						<li>검색한 기록이 없습니다</li>
					)}
				</ul>
			}
		</Box>
	)}
</ChipWrapper>; */
