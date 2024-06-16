/** @format */

import Chip from "@mui/material/Chip"
import Stack from "@mui/material/Stack"
import logo from "../assets/logo.png"
import styled from "styled-components"
import SearchBar from "./Search/SearchBar.js"

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
`

function SideHead({ setAddress }) {
  const handleClick = () => {
    console.info("You clicked the Chip.")
  }

  return (
    <Header>
      <img src={logo} className="logo" alt="logo" />
      <SearchBar setAddress={setAddress} />
      <Stack direction="row" spacing={1} justifyContent="flex-end">
        <Chip label="검색히스토리" color="primary" onClick={handleClick} />
      </Stack>
    </Header>
  )
}

export default SideHead
