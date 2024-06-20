/** @format */

import React, { useState, useEffect } from "react"
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
    margin: 15px 0 8px;
    font-size: 2rem;
    font-weight: 500;

    @media (max-width: 768px) {
      margin: 10px 0 14px;
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
  margin: 35px auto;
  padding: 10px;
  border: 1px solid #008cda;
  font-size: 11px;
  border-radius: 10px;
  background-color: #fff;

  & p {
    font-size: 12px;
    font-weight: 700;
    padding-bottom: 8px;
  }
`

function Data({ lon, lat, distance }) {
  const [anchorEl, setAnchorEl] = useState(null)
  const [dataLoaded, setDataLoaded] = useState(false) 

  useEffect(() => {
    if (lon !== null && lat !== null && distance !== null) {
      setDataLoaded(true) 
    }
  }, [lon, lat, distance])

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
              <p
                style={{
                  fontSize: "12px",
                  fontWeight: 700,
                  paddingBottom: "8px",
                }}
              >
                안전점수 계산
              </p>
              cctvCount3 = (cctvCount*5) cctvScore = ((cctvCount3) /
              (cctvCount3+lightCount)) * 0.75; lightScore = (lightCount /
              (cctvCount3+lightCount)) * 0.25; totalScore = (cctvScore +
              lightScore) * 1.2 * 100;
            </Typography>
          </Popover>
        </div>
        {dataLoaded ? (
          <GradeView lon={lon} lat={lat} distance={distance} />
        ) : (
          <p>장소를 검색하시면 해당 장소에 치안 등급을 보실 수 있습니다.</p>
        )}
        {isPc ? (
          <ScoreExp>
            <p>안전점수 계산</p>
            cctvCount3 = (cctvCount*5) cctvScore = ((cctvCount3) /
            (cctvCount3+lightCount)) * 0.75; lightScore = (lightCount /
            (cctvCount3+lightCount)) * 0.25; totalScore = (cctvScore +
            lightScore) * 1.2 * 100;
          </ScoreExp>
        ) : null}
      </DataSection>
    </>
  )
}

export default Data
