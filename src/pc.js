/** @format */

import styled from "styled-components"
import SideBar from "./components/SideBar"
import KakaoMap from "./components/Map"

const PCWrapper = styled.div`
display: flex;
`

function PC() {
  return (
    <>
      <PCWrapper>
        <SideBar setSelectedAddress={setAddress}/>
        <KakaoMap currAddr={address}/>
      </PCWrapper>
    </>
  )
}

export default PC
