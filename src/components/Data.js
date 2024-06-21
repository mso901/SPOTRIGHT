/** @format */

import React, { useState } from "react";
import styled from "styled-components";
import GradeView from "./SideData/GradeView.js";
import { useMediaQuery } from "react-responsive";
import { Popover, IconButton, Typography } from "@mui/material";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";

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
`;

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
`;
const ScoreExp = styled.div`
  margin: 35px auto;
  padding: 10px;
  border: 1px solid #008cda;
  font-size: 11px;
  line-height: 15px;
  border-radius: 10px;
  background-color: #fff;

  & p {
    font-size: 12px;
    font-weight: 700;
    padding-bottom: 8px;
  }
`;

function Data() {
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);

  const id = open ? "simple-popover" : undefined;

  const isPc = useMediaQuery({ query: "(min-width: 768px)" });

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
                  lineHeight: "15px",
                  paddingBottom: "8px",
                }}
              >
                치안점수 계산
              </p>
              치안점수 계산에는 cctv와 보안등의 개수를 이용하였으며 cctv에 더
              많은 치안 가중치를 부여하여 점수를 도출하였습니다.
            </Typography>
          </Popover>
        </div>
        <GradeView />
        {isPc ? (
          <ScoreExp>
            <p>치안점수 계산</p>
            치안점수 계산에는 cctv와 보안등의 개수를 이용하였으며 cctv에 더 많은
            치안 가중치를 부여하여 점수를 도출하였습니다.
          </ScoreExp>
        ) : null}
      </DataSection>
    </>
  );
}

export default Data;
