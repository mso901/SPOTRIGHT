/** @format */

import styled from "styled-components"
import GradeView from "./SideData/GradeView.js"

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
  }
  & .section_head h3 {
    font-size: 2rem;
    font-weight: 400;
  }

  & ul {
    display: flex;
  }

  & ul li {
    padding-right: 10px;
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

function Data() {

  return (
    <>
      <DataSection>
        <div className="section_head">
          <h3>이 곳의 치안은?</h3>
        </div>
        <GradeView />
        <ScoreExp>
          점수산정 기준//점수산정 기준//점수산정 기준//점수산정 기준 //점수산정
          기준 //점수산정 기준 //점수산정 기준 //점수산정 기준 //점수산정 기준
        </ScoreExp>
      </DataSection>
    </>
  )
}

export default Data
