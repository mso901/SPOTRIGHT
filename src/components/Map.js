/** @format */
import { atom, useAtom, useSetAtom } from "jotai";
import { selectedDataType, selectedDistance } from "./SideHead";
import styled from "styled-components";
import React, { useState, useEffect } from "react";
import {
  Map,
  MapMarker,
  MapTypeControl,
  ZoomControl,
  Circle,
} from "react-kakao-maps-sdk";
import axios from "axios";
import { selectedAddress } from "./Search/SearchBar";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useTour } from "@reactour/tour";

const { kakao } = window;

// 임시로 지정한 디폴트 지도 중심 위치
const defaultLoc = atom({
  latitude: 37.556809,
  longitude: 126.971566,
});
// 다른 파일에서 사용할 수 있는 지도 중심 위치 데이터
export const centerLoc = atom((get) => get(defaultLoc));

const dataCnt = atom(0);
export const selectedDataCount = atom((get) => get(dataCnt));

// 백엔드에서 위도 경도를 소수점 포함 맥시멈 10글자로 제한함
function formatCoordinate(value) {
  const numberValue = Number(value);
  return parseFloat(numberValue.toFixed(6));
}

// cctv 데이터 가져오는 함수
// http://kdt-ai-10-team01.elicecoding.com
// http://kdt-ai-10-team01.elicecoding.com:3000/map/cctv?longitude=127.084032&latitude=37.483869&distance=1000
async function fetchCCTVData(longitude, latitude, distance) {
  const BASE_URL = "/api"; // 기본 URL 설정

  const baseInstance = await axios.create({
    baseURL: BASE_URL, // 기본 URL 설정
  });

  // 1-10자리 limit (위도 경도)
  try {
    const response = await baseInstance.get(`/map/cctv`, {
      params: {
        longitude: longitude,
        latitude: latitude,
        distance: distance,
      },
    });
    const cctvData = response.data;
    // console.log("cctv data:", cctvData);
    return cctvData;
  } catch (error) {
    console.log("맵에서 보낸 데이터:", { longitude, latitude, distance });
    console.log("cctv 데이터 가져오는데 실패:", error);
  }
}

// 보안등 데이터 가져오는 함수
async function fetchSecurityLight(longitude, latitude, distance) {
  const BASE_URL = "/api"; // 기본 URL 설정

  const baseInstance = await axios.create({
    baseURL: BASE_URL, // 기본 URL 설정
  });

  // 1-10자리 limit (위도 경도)
  try {
    const response = await baseInstance.get(`/map/security-light`, {
      params: {
        longitude: longitude,
        latitude: latitude,
        distance: distance,
      },
    });
    const securityLight = response.data;
    return securityLight;
  } catch (error) {
    console.log("맵에서 보낸 데이터:", { longitude, latitude, distance });
    console.log("보안등 데이터 가져오는데 실패:", error);
  }
}

const CircleButton = styled.button`
  position: absolute;
  top: 8px;
  right: 125px;
  z-index: 1000;
  display: inline-block;
  width: 50px;
  height: 50px;
  font-size: 21px;
  font-weight: 900;
  border-radius: 50%;
  background-color: #1976d2;
  opacity: 80%;
  border: none;
  color: white; /* 글자색 */
  text-align: center;
  line-height: 50px; /* 버튼 내 텍스트 세로 가운데 정렬 */
  cursor: pointer; /* 호버 시 포인터 모양으로 */

  /* 호버 시 배경색 변경 */
  &:hover {
    width: 120px;
    opacity: 100%;
    font-size: 15px;
    font-weight: 400;
    border-radius: 20px;
  }

  @media (max-width: 768px) {
    top: 152px;
    left: 6px;
    width: 40px;
    height: 40px;
    line-height: 40px;
  }
`;

// 카카오 맵 함수
export default function KakaoMap() {
  const { setIsOpen } = useTour();
  const [address] = useAtom(selectedAddress);
  const [centerLocation, setCenterLocation] = useAtom(defaultLoc); // 현재 위치
  const [locations, setLocations] = useState([]); //데이터의 위도 경도 json list
  const [dataType] = useAtom(selectedDataType); // 사용자가 지정한 데이터 타입: cctv, 보안등
  const [distance] = useAtom(selectedDistance); // 거리: 500m, 1000m
  const [count, setCount] = useAtom(dataCnt); // 데이터 타입 개수 세기
  const [hovered, setHovered] = useState(false);

  useEffect(() => {
    console.log(
      `입력하신 위치 ${address} 로부터 ${distance}m 이내에 있는 ${dataType} 데이터를 가져오는 중입니다!`
    );
  }, [address, dataType, distance]);

  useEffect(() => {
    if (address) {
      // 사용자가 입력한 주소를 위도 경도로 바꿔주는 함수 (유효한 주소일때만)
      let geocoder = new kakao.maps.services.Geocoder();
      geocoder.addressSearch(address, (result, status) => {
        if (status === kakao.maps.services.Status.OK) {
          // console.log("converted addr:", result[0]);
          let { x: longitude, y: latitude } = result[0];
          // longitude = formatCoordinate(longitude);
          // latitude = formatCoordinate(latitude);
          setCenterLocation({ latitude, longitude });
        } else {
          console.error("Invalid Address: " + status);
        }
      });
    }
  }, [address]); // 사용자가 입력한 주소가 바뀔 때마다 위도와 경도 받아와서 마커 위치 업데이트 하기

  useEffect(() => {
    const latitude = formatCoordinate(centerLocation.latitude);
    const longitude = formatCoordinate(centerLocation.longitude);

    if (dataType === "CCTV") {
      console.log("CCTV가 선택되었습니다");

      fetchCCTVData(longitude, latitude, distance)
        .then((data) => {
          setLocations(data);
          setCount(data.length);
          console.log("fetched cctv data:", data);
          console.log("cctv 개수:", data.length);
        })
        .catch((error) => {
          toast.error(
            `주변에 cctv가 없습니다.
            (서울 외의 지역은 검색하실 수 없습니다.)`,
            {
              autoClose: 2000,
            }
          );
          setCount(0);
        });
    } else if (dataType === "보안등") {
      console.log("보안등이 선택되었습니다");
      console.log(`거리: ${distance}m`);
      console.log("주소:", address);

      fetchSecurityLight(longitude, latitude, distance)
        .then((data) => {
          setLocations(data);
          setCount(data.length);
          console.log("fetched 보안등 data:", data);
          console.log("보안등 개수:", data.length);
        })
        .catch((error) => {
          toast.error(
            "주변에 보안등이 없습니다.\n(성동, 동대문, 용산, 송파에는 보안등 데이터가 없습니다.)",
            {
              autoClose: 2000,
            }
          );
          setCount(0);
        });
    }
  }, [centerLocation, dataType, distance]); // 지도의 중심 위치, 데이터 타입, 거리가 바뀔때마다 중심 위치 기준으로 새로운 데이터 받아오기

  // 사용자가 중심 위치를 드래그로 바꾸면 맵의 중심도 바꾸기
  const handleDragEnd = (marker) => {
    const lat = marker.getPosition().getLat();
    const lng = marker.getPosition().getLng();
    setCenterLocation({ latitude: lat, longitude: lng });
  };

  return (
    <>
      {centerLocation && (
        <Map
          center={{
            lat: centerLocation.latitude,
            lng: centerLocation.longitude,
          }}
          style={{ position: "relative", width: "100%", height: "100vh" }}
          level={3}
        >
          <CircleButton
            className="circle-button"
            onClick={() => setIsOpen(true)}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
          >
           {hovered ? "처음이신가요?" : "?"}
          </CircleButton>
          <MapMarker
            position={{
              lat: centerLocation.latitude,
              lng: centerLocation.longitude,
            }}
            draggable={true}
            onDragEnd={handleDragEnd}
          />
          <Circle
            center={{
              lat: centerLocation.latitude,
              lng: centerLocation.longitude,
            }}
            radius={distance}
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
