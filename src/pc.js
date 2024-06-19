/** @format */

import React, { useEffect, useState } from "react";
import styled from "styled-components";
import SideBar from "./components/SideBar";
import KakaoMap from "./components/Map";

const PCWrapper = styled.div`
	display: flex;
`;

function PC() {
	const [address, setAddress] = useState("");
	  const [lon, setLon] = useState("1")
    const [lat, setLat] = useState("2")
    const [distance, setDistance] = useState("3")


	return (
    <>
      <PCWrapper>
        <SideBar
          setAddress={setAddress}
          lon={lon}
          lat={lat}
          distance={distance}
        />
        <KakaoMap
          address={address}
          setLon={setLon}
          setLat={setLat}
          setDistance={setDistance}
        />
      </PCWrapper>
    </>
  )
}

export default PC;
