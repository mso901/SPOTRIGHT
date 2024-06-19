/** @format */

import React, { useState } from "react"
import styled from "styled-components"
import GradeView from "./SideData/GradeView.js"
import { useMediaQuery } from "react-responsive"
import { Popover, IconButton, Typography } from "@mui/material"
import HelpOutlineIcon from "@mui/icons-material/HelpOutline"

const DataSection = styled.section`
  margin: 0 auto;
  padding: 1.5rem;
  width: 90%;

  @media (max-width: 768px) {
    height: auto;
  }

  & .section_head {
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  & .section_head h3 {
    font-size: 2rem;
    font-weight: 400;

    @media (max-width: 768px) {
      margin: 0;
    }
  }

  & ul {
    display: flex;
  }

  & ul li {
    padding-right: 10px;
  }
`

const ScoreExpButton = styled(IconButton)`
  margin: auto;
  padding: 10px;
  border: 1px solid #008cda;
  font-size: 11px;
  border-radius: 10px;
  background-color: #fff;

  & .MuiSvgIcon-root {
    font-size: 2rem; // 아이콘 크기 조정
  }
`
const ScoreExp = styled.div`
  margin: auto;
  padding: 10px;
  border: 1px solid #008cda;
  font-size: 11px;
  border-radius: 10px;
  background-color: #fff;
`

function Data({ lon, lat, distance }) {
  console.log("위치:", lon, lat, distance)
  
  const [anchorEl, setAnchorEl] = useState(null)

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  const open = Boolean(anchorEl)
  const id = open ? "simple-popover" : undefined

  const isPc = useMediaQuery({ query: "(min-width: 768px)" })

  return (
    <>
      <DataSection>
        <div className="section_head">
          <h3>이 곳의 치안은?</h3>
          <ScoreExpButton onClick={handleClick}>
            {isPc ? null : <HelpOutlineIcon />}
          </ScoreExpButton>
          <Popover
            id={id}
            open={open}
            anchorEl={anchorEl}
            onClose={handleClose}
            anchorOrigin={{
              vertical: "top",
              horizontal: "center",
            }}
            transformOrigin={{
              vertical: "bottom",
              horizontal: "center",
            }}
          >
            <Typography sx={{ p: 2 }}>
              점수산정 기준 // 점수산정 기준 // 점수산정 기준 // 점수산정 기준
              // 점수산정 기준 // 점수산정 기준 // 점수산정 기준 // 점수산정
              기준 // 점수산정 기준 // 점수산정 기준
            </Typography>
          </Popover>
        </div>
        <GradeView lon={lon} lat={lat} distance={distance} />
        {isPc ? (
          <ScoreExp>
            점수산정 기준//점수산정 기준//점수산정 기준//점수산정 기준
            //점수산정 기준 //점수산정 기준 //점수산정 기준 //점수산정 기준
            //점수산정 기준
          </ScoreExp>
        ) : null}
      </DataSection>
    </>
  )
}

export default Data
