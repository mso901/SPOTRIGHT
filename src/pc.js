/** @format */

import React, { useEffect, useState } from "react";
import styled from "styled-components";
import SideBar from "./components/SideBar";
import KakaoMap from "./components/Map";

const PCWrapper = styled.div`
	display: flex;
`;

function PC() {
	// 사용자의 주소
	const [address, setAddress] = useState("");

	return (
		<>
			<PCWrapper>
				<SideBar setAddress={setAddress} />
				<KakaoMap address={address} />
			</PCWrapper>
		</>
	);
}

export default PC;
