/** @format */

import React, { useEffect, useState } from "react";
import styled from "styled-components";
import SideBar from "./components/SideBar";
import KakaoMap from "./components/Map";

const PCWrapper = styled.div`
	display: flex;
`;

function PC() {
	return (
		<>
			<PCWrapper>
				<SideBar />
				<KakaoMap />
			</PCWrapper>
		</>
	);
}

export default PC;
