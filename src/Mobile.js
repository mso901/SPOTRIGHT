/** @format */

import React, { useState } from "react"
import styled from "styled-components"
import KakaoMap from "./components/Map"
import SideHead from "./components/SideHead.js"
import Data from "./components/Data.js"

const MobileWrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
`

function Mobile() {
  const [address, setAddress] = useState("")

  return (
    <>
      <MobileWrapper>
        <SideHead setSelectedAddress={setAddress} />
        <KakaoMap currAddr={address} />
        <Data />
      </MobileWrapper>
    </>
  )
}

export default Mobile
