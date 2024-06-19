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
  const [lon, setLon] = useState("")
  const [lat, setLat] = useState("")
  const [distance, setDistance] = useState("")

  return (
    <>
      <MobileWrapper>
        <SideHead setSelectedAddress={setAddress} />
        <KakaoMap
          currAddr={address}
          setLon={setLon}
          setLat={setLat}
          setDistance={setDistance}
        />
        <Data lon={lon} lat={lat} distance={distance} />
      </MobileWrapper>
    </>
  )
}

export default Mobile
