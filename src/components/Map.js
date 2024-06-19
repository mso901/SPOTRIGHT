/** @format */

import React, { useState, useEffect } from "react";
import {
	Map,
	MapMarker,
	MapTypeControl,
	ZoomControl,
	Circle,
} from "react-kakao-maps-sdk";
import axios from "axios";

const { kakao } = window;

// 백엔드에서 위도 경도를 소수점 포함 맥시멈 10글자로 제한함
function formatCoordinate(value) {
	return parseFloat(value.toFixed(6));
}

// cctv 데이터 가져오는 함수
// http://kdt-ai-10-team01.elicecoding.com
// http://kdt-ai-10-team01.elicecoding.com:3000/map/cctv?longitude=127.084032&latitude=37.483869&distance=1000
async function fetchCCTVData(longitude, latitude, distance) {
	const BASE_URL = "http://localhost:3000/"; // 기본 URL 설정

	const baseInstance = await axios.create({
		baseURL: BASE_URL, // 기본 URL 설정
	});

	const formattedLongitude = formatCoordinate(longitude);
	const formattedLatitude = formatCoordinate(latitude);

	// 9-10자리 limit (위도 경도)
	try {
		const response = await baseInstance.get(`/map/cctv`, {
			params: {
				longitude: formattedLongitude,
				latitude: formattedLatitude,
				distance: distance,
			},
		});
		const cctvData = response.data;
		// console.log("cctv data:", cctvData);
		return cctvData;
	} catch (error) {
		console.log("보낸 데이터:", { longitude, latitude, distance });
		console.log("cctv 데이터 가져오는데 실패:", error);
	}
}

// 카카오 맵 함수
export default function KakaoMap({ address, setLon, setLat, setDistance }) {
	// 현재 위치 (임시 저장)
	const [centerLocation, setCenterLocation] = useState({
		latitude: 37.483869,
		longitude: 127.084032,
	});

	const [locations, setLocations] = useState([]);

	useEffect(() => {
		if (address) {
			// 사용자가 입력한 주소를 위도 경도로 바꿔주는 함수 (유효한 주소일때만)
			let geocoder = new kakao.maps.services.Geocoder();
			geocoder.addressSearch(address, (result, status) => {
				if (status === kakao.maps.services.Status.OK) {
					console.log("converted addr:", result[0]);
					const { x: longitude, y: latitude } = result[0];
					setCenterLocation({ latitude, longitude });
				} else {
					console.error("Invalid Address: " + status);
				}
			});
		}
	}, [address]); // 사용자가 입력한 주소가 바뀔 때마다 위도와 경도 받아와서 마커 위치 업데이트 하기

	useEffect(() => {
		// const newLocations = [
		// 	{
		// 		title: "생태연못",
		// 		latlng: {
		// 			lat: centerLocation.latitude + 0.001,
		// 			lng: centerLocation.longitude + 0.0001,
		// 		},
		// 	},
		// 	{
		// 		title: "텃밭",
		// 		latlng: {
		// 			lat: centerLocation.latitude,
		// 			lng: centerLocation.longitude + 0.002,
		// 		},
		// 	},
		// 	{
		// 		title: "근린공원",
		// 		latlng: {
		// 			lat: centerLocation.latitude - 0.002,
		// 			lng: centerLocation.longitude,
		// 		},
		// 	},
		// ];

		fetchCCTVData(centerLocation.longitude, centerLocation.latitude, 500)
			.then((data) => {
				setLocations(data);
				console.log("fetched cctv data:", data);
			})
			.catch((error) => {
				console.log("failed to fetch cctv data:", error);
			});
	}, [centerLocation]); // 지도의 중심 위치가 바뀔때마다 중심 위치 기준으로 새로운 데이터 받아오기

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
					{locations &&
						locations.map((loc, idx) => (
							<MapMarker
								key={`${loc.latitude}-${idx}`}
								position={{
									lat: loc.latitude,
									lng: loc.longitude,
								}}
								image={{
									src: "https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/markerStar.png",
									size: { width: 24, height: 35 },
								}}
							/>
						))}
					<MapTypeControl position={"TOPRIGHT"} />
					<ZoomControl position={"RIGHT"} />
				</Map>
			)}
		</>
	);
}
