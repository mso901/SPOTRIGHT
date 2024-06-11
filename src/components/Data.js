/** @format */

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

function Data() {
  return (
    <div className="data">
      <DataSection>
        <div className="section_head">
          <h3>spot 치안</h3>
          <span>?</span>
        </div>
        <DataView />
        <ul>
          <li>cctv</li>
          <li>보안등</li>
          <li>거리</li>
        </ul>
      </DataSection>
    </div>
  )
}

export default Data
