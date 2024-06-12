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

export default function KakaoMap({ address }) {
	useEffect(() => {
		console.log("kakaomap given address:", address);
		if (address) {
			let geocoder = new kakao.maps.services.Geocoder();
			geocoder.addressSearch(address, (result, status) => {
				if (status === kakao.maps.services.Status.OK) {
					console.log("converted addr:", result[0]);
					const { x: longitude, y: latitude } = result[0];
					setCenterLocation({ latitude, longitude });
				} else {
					console.error("Geocode was not successful: " + status);
				}
			});
		}
	}, [address]);

	// 현재 위치
	const [centerLocation, setCenterLocation] = useState({
		latitude: 33.450701,
		longitude: 126.570667,
	});

	const [locations, setLocations] = useState([]);

	useEffect(() => {
		const newLocations = [
			{
				title: "생태연못",
				latlng: {
					lat: centerLocation.latitude + 0.001,
					lng: centerLocation.longitude + 0.0001,
				},
			},
			{
				title: "텃밭",
				latlng: {
					lat: centerLocation.latitude,
					lng: centerLocation.longitude + 0.002,
				},
			},
			{
				title: "근린공원",
				latlng: {
					lat: centerLocation.latitude - 0.002,
					lng: centerLocation.longitude,
				},
			},
			{
				title: "01강",
				latlng: {
					lat: centerLocation.latitude,
					lng: centerLocation.longitude - 0.002,
				},
			},
		];

		setLocations(newLocations);
	}, [centerLocation]);

	return (
		<>
			{centerLocation && (
				<Map
					center={{
						lat: centerLocation.latitude,
						lng: centerLocation.longitude,
					}}
					style={{ width: "100%", height: "100vh" }}
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
						strokeWeight={5} // 선의 두께
						strokeColor={"#75B8FA"} // 선의 색깔
						strokeOpacity={1} // 선의 불투명도 1에서 0 사이의 값이며 0에 가까울수록 투명
						strokeStyle={"dashed"} // 선의 스타일
						fillColor={"#CFE7FF"} // 채우기
						fillOpacity={0.3} // 채우기 불투명도
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
		</>
	);
}
