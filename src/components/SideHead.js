/** @format */

import { useState } from "react"
import { Stack, Chip, Box } from "@mui/material"
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

const ChipWrapper = styled.div`
  position: relative;
  display: inline-block;
`

function SideHead({ setAddress }) {
  const [open, setOpen] = useState(false)

  const handleClick = () => {
    console.log("Chip clicked")
    setOpen(!open)
  }

  return (
    <Header>
      <img src={logo} className="logo" alt="logo" />
      <SearchBar setAddress={setAddress} />
      <Stack
        direction="row"
        spacing={1}
        justifyContent="flex-end"
        alignItems="flex-start"
        sx={{ width: "100%", height: "5rem", paddingRight: "2rem" }}
      >
        <ChipWrapper>
          <Chip label="검색히스토리" color="primary" onClick={handleClick} />
          {open && (
            <Box
              sx={{
                width: 300,
                height: 200,
                backgroundColor: "#fff",
                position: "absolute",
                zIndex:10,
                top: "30px", 
                right: 0,
                border: "1px solid grey",
                borderRadius: "4px",
                boxShadow: 3,
                p: 2,
              }}
            >
              검색 히스토리 내용
            </Box>
          )}
        </ChipWrapper>
      </Stack>
    </Header>
  )
}

export default SideHead
