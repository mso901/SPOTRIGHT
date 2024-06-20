/** @format */
import { toast } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import { atom, useAtom } from "jotai";
import * as React from "react";
import { useState } from "react";
import { Stack, Chip } from "@mui/material";
import { useMediaQuery } from "react-responsive";
import logo from "../assets/logo.png";
import styled from "styled-components";
import SearchBar from "./Search/SearchBar.js";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { styled as muiStyled } from "@mui/material/styles";

// 데이터 타입: cctv, 보안등 둘 중 하나 선택
const defaultDataType = atom("CCTV");
// 다른 파일에서 데이터 타입을 읽을 수 있게 export
export const selectedDataType = atom((get) => get(defaultDataType));

// 거리: 500미터, 1000미터 둘 중 하나 선택
const defaultDistance = atom(500);
export const selectedDistance = atom((get) => get(defaultDistance));

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
		padding-bottom: 1vh;
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
  margin: 5px auto 8px;
  width: 93%;
  height: 5rem;
`

const StyledChip = muiStyled(Chip)(({ theme }) => ({
	fontSize: "1.2rem",
	fontWeight: 700,
	height: "30px", // Chip 높이 조정
	"& .MuiChip-label": {
		padding: "0 10px", // 텍스트 패딩 조정
	},
}));

// 거리 데이터 업데이트: 500m, 1km 둘 중 하나 선택
const DistanceMenu = ({ anchorEl, handleClose }) => {
	const [distance, setDistance] = useAtom(defaultDistance);

	const handleDistanceClick = (event) => {
		// console.log("distance", event.currentTarget.innerText)
		const distanceValue = parseInt(event.currentTarget.innerText);
		console.log("distance", distanceValue);
		setDistance(distanceValue);
		handleClose();
	};

	return (
		<Menu
			id="basic_distance"
			anchorEl={anchorEl}
			open={Boolean(anchorEl)}
			onClose={handleClose}
			MenuListProps={{
				"aria-labelledby": "basic_distance",
			}}
		>
			<MenuItem style={{ fontSize: "1.3rem" }} onClick={handleDistanceClick}>
				500M
			</MenuItem>
			<MenuItem style={{ fontSize: "1.3rem" }} onClick={handleDistanceClick}>
				1000M
			</MenuItem>
		</Menu>
	);
};

const SearchHistoryMenu = ({ anchorEl, handleClose, searchHistory }) => {
	const copyToClipboard = async (text) => {
		try {
			await navigator.clipboard.writeText(text);
			toast.success("클립보드에 복사되었습니다:", text);
		} catch (err) {
			toast.error("클립보드에 복사 실패:", err);
		}
	};

	const searchHistoryHandleClick = (event, history) => {
		copyToClipboard(history);
		handleClose();
	};

	return (
		<Menu
			id="basic-menu"
			anchorEl={anchorEl}
			open={Boolean(anchorEl)}
			onClose={handleClose}
			MenuListProps={{
				"aria-labelledby": "basic-button",
			}}
		>
			{searchHistory.length > 0 ? (
				searchHistory.map((history, index) => (
					<MenuItem
						key={index}
						style={{ fontSize: "1.3rem" }}
						onClick={(event) => searchHistoryHandleClick(event, history)}
					>
						{history}
					</MenuItem>
				))
			) : (
				<MenuItem onClick={handleClose}>검색한 기록이 없습니다</MenuItem>
			)}
		</Menu>
	);
};

function SideHead() {
	const [searchHistory, setSearchHistory] = useState([]);
	const [anchorElDistance, setAnchorElDistance] = useState(null);
	const [anchorElHistory, setAnchorElHistory] = useState(null);

	const [dataType, setDataType] = useAtom(defaultDataType);
	const [distance, setDistance] = useAtom(defaultDistance);

	const isPc = useMediaQuery({ query: "(min-width: 768px)" });

	const handleDistanceClick = (event) => {
		setAnchorElDistance(event.currentTarget);
	};

	const handleHistoryClick = (event) => {
		setAnchorElHistory(event.currentTarget);
	};

	const handleCloseDistance = () => {
		setAnchorElDistance(null);
	};

	const handleCloseHistory = () => {
		setAnchorElHistory(null);
	};

	return (
		<Header>
			<HeadInner>
				{isPc ? <img src={logo} className="logo" alt="logo" /> : null}
				<SearchBar setSearchHistory={setSearchHistory} />
				<Chips>
					<Stack direction="row" spacing={1}>
						<StyledChip
							label="CCTV"
							color="primary"
							variant="outlined"
							onClick={(event) => setDataType(event.currentTarget.innerText)}
						/>
						<StyledChip
							label="보안등"
							color="primary"
							variant="outlined"
							onClick={(event) => setDataType(event.currentTarget.innerText)}
						/>
						<StyledChip
							label="거리"
							color="primary"
							variant="outlined"
							onClick={handleDistanceClick}
						/>
						<DistanceMenu
							anchorEl={anchorElDistance}
							handleClose={handleCloseDistance}
						/>
					</Stack>
					<Stack direction="row" spacing={1}>
						<StyledChip
							label="검색 히스토리"
							onClick={handleHistoryClick}
							sx={{
								color: "#fff",
								backgroundColor: "#1976d2",
							}}
						/>
						<SearchHistoryMenu
							anchorEl={anchorElHistory}
							handleClose={handleCloseHistory}
							searchHistory={searchHistory}
						/>
					</Stack>
				</Chips>
			</HeadInner>
		</Header>
	);
}

export default SideHead;
