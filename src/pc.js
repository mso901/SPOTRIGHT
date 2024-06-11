/** @format */

import React, { useState } from "react"
import styled from "styled-components"
import SideBar from "./components/SideBar"
import KakaoMap from "./components/Map"

const PCWrapper = styled.div`
display: flex;
`

function PC() {
const [address, setAddress] = useState("")

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
