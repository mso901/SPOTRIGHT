/** @format */

import { Chip, Stack } from "@mui/material"
import { styled as muiStyled } from "@mui/material/styles"
import styled from "styled-components"
import DataView from "./SideData/DataView.js"

const DataSection = styled.section`
  padding: 1.5rem;
  width: 100%;

  & .section_head {
    width: 100%;
    display: flex;
    justify-content: space-between;
  }
  & .section_head h3 {
    font-size: 2rem;
    font-weight: 400;
  }

  & .section_head span {
    position: relative;
  }

  & .section_head span::before {
    content: "";
    position: absolute;
    left: -6px;
    top: -2px;
    width: 1.5rem;
    height: 1.5rem;
    border: 1px solid black;
    border-radius: 50%;
  }

  & ul {
    display: flex;
  }

  & ul li {
    padding-right: 10px;
  }
`

const StyledChip = muiStyled(Chip)(({ theme }) => ({
  fontSize: "1rem",
  height: "24px", // Chip 높이 조정
  "& .MuiChip-label": {
    padding: "0 8px", // 텍스트 패딩 조정
  },
}))

function Data() {
  const handleClick = () => {
    console.info("You clicked the Chip.")
  }

  return (
    <div className="data">
      <DataSection>
        <div className="section_head">
          <h3>이 곳의 치안은?</h3>
          <span>?</span>
        </div>
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
        <DataView />
      </DataSection>
    </div>
  )
}

export default Data
