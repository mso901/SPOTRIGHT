/** @format */

import React, { useState, useEffect } from "react";
import {
	Map,
	MapMarker,
	MapTypeControl,
	ZoomControl,
	Circle,
} from "react-kakao-maps-sdk";
const { kakao } = window;

export default function KakaoMap() {
	const locations = [
		{
			title: "생태연못",
			latlng: { lat: 33.450936, lng: 126.569477 },
		},
		{
			title: "텃밭",
			latlng: { lat: 33.450879, lng: 126.56994 },
		},
		{
			title: "근린공원",
			latlng: { lat: 33.451393, lng: 126.570738 },
		},
	];

	// 현재 위치
	const [centerLocation, setCenterLocation] = useState({
		latitude: 33.450701,
		longitude: 126.570667,
	});

	useEffect(() => {
		navigator.geolocation.getCurrentPosition(getLocation, errorHandler);
	}, []);

	const getLocation = (response) => {
		console.log(response);
		const { latitude, longitude } = response.coords;
		setCenterLocation({ latitude, longitude });
	};

	const errorHandler = (error) => {
		console.log(error);
	};

	return (
		<>
			{centerLocation && (
				<Map
					center={{
						lat: centerLocation.latitude,
						lng: centerLocation.longitude,
					}}
					style={{ width: "77.5%", height: "100vh" }}
					level={3}
				>
					<MapMarker
						position={{
							lat: centerLocation.latitude,
							lng: centerLocation.longitude,
						}}
					/>
					<Circle
						center={{
							lat: centerLocation.latitude,
							lng: centerLocation.longitude,
						}}
						radius={500}
						strokeWeight={5} // 선의 두께입니다
						strokeColor={"#75B8FA"} // 선의 색깔입니다
						strokeOpacity={1} // 선의 불투명도 입니다 1에서 0 사이의 값이며 0에 가까울수록 투명합니다
						strokeStyle={"dashed"} // 선의 스타일 입니다
						fillColor={"#CFE7FF"} // 채우기 색깔입니다
						fillOpacity={0.3} // 채우기 불투명도 입니다
					/>
					{locations.map((loc, idx) => (
						<MapMarker
							key={`${loc.title}-${idx}`}
							position={loc.latlng}
							image={{
								src: "https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/markerStar.png",
								size: { width: 24, height: 35 },
							}}
							title={loc.title}
						/>
					))}
					<MapTypeControl position={"TOPRIGHT"} />
					<ZoomControl position={"RIGHT"} />
				</Map>
			)}
			{/* {locations.map((currLoc, idx) => (
					<MapMarker
						key={`${currLoc.title}-${idx}`}
						position={currLoc.latlng}
						image={{
							src: "https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/markerStar.png",
							size: { width: 24, height: 35 },
						}}
						title={currLoc.title}
					/>
				))} */}
		</>
	);
}
