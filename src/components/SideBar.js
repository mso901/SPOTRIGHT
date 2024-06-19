/** @format */

import Data from "./Data";
import styled from "styled-components"
import SideHead from "./SideHead.js";

const SideBarContainer = styled.div`
  width: 42%;
  min-width: 35rem;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  background-color: #e1edfa;
`

function SideBar({ setAddress, lon, lat, distance }) {
	return (
    <>
      <SideBarContainer>
        <SideHead setAddress={setAddress} />
        <Data lon={lon} lat={lat} distance={distance} />
      </SideBarContainer>
    </>
  )
}

export default SideBar;
