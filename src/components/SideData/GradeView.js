/** @format */

import { useAtom } from "jotai";
import { selectedDataType, selectedDistance } from "../SideHead";
import { centerLoc, selectedDataCount } from "../Map";
import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Data.css";

// 백엔드에서 위도 경도를 소수점 포함 맥시멈 10글자로 제한함
function formatCoordinate(value) {
	const numberValue = Number(value);
	return parseFloat(numberValue.toFixed(6));
}

const fetchScore = async (longitude, latitude, distance, setScore) => {
<<<<<<< HEAD
	const baseUrl = "http://localhost:3000/"; // 베이스 url 설정
	try {
		console.log("점수 합산 위해 보낸 데이터:", {
			longitude,
			latitude,
			distance,
		});
		const response = await axios.get(`${baseUrl}/map/safety-score`, {
			params: {
				longitude: longitude,
				latitude: latitude,
				distance: distance,
			},
		});
		// console.log("res:", response.data);
		const score = response.data["Safety_score"]; // 점수 가져오기
		// console.log("score:", score);
		setScore(score);
	} catch (error) {
		console.log("점수 합산 위해 보낸 데이터:", {
			longitude,
			latitude,
			distance,
		});
		console.error("Error fetching the score:", error);
		setScore(null);
	}
};
=======
  const baseUrl = "http://localhost:3000/"

  try {
    const response = await axios.get(`${baseUrl}/map/safety-score`, {
      params: {
        longitude: longitude,
        latitude: latitude,
        distance: distance,
      },
    })
    console.log("res:", response.data)
    const score = response.data["Safety_score"]
    // const score = "55"
    console.log("score:", score)
    setScore(score)
  } catch (error) {
    console.log("보낸 데이터:", { longitude, latitude, distance })
    console.error("Error fetching the score:", error)
    setScore(null)
  }
}

function formatCoordinate(value) {
  const numberValue = Number(value)
  return parseFloat(numberValue.toFixed(6))
}
>>>>>>> 4b7f0e3 (반응형 로고, 시작페이지 시도)

function getGradeDetails(score) {
	if (score >= 70) {
		return { color: "green", grade: "1등급", safety: "안전" };
	} else if (score >= 40) {
		return { color: "yellow", grade: "2등급", safety: "주의" };
	} else {
		return { color: "red", grade: "3등급", safety: "경고" };
	}
}

function GradeView() {
	const [score, setScore] = useState(null);
	const [distance] = useAtom(selectedDistance); // 거리: 500m, 1000m (sidehead에서 가져옴)
	const [centerLocation] = useAtom(centerLoc); // 지도의 중심 위치 (map.js에서 가져옴); 1-10자리수에 맞게 포멧되어 있음(아마도?), 데이터 형태: { "latitude": 37.483869,"longitude": 127.084032 }
	const [dataType] = useAtom(selectedDataType);
	const [dataCount] = useAtom(selectedDataCount);

	useEffect(() => {
		if (dataCount > 0) {
			let { latitude, longitude } = centerLocation;
			longitude = formatCoordinate(longitude);
			latitude = formatCoordinate(latitude);

			fetchScore(longitude, latitude, distance, setScore);
		}
	}, [centerLocation, distance, dataCount]);

	if (score === null) {
		return <div>Loading...</div>;
	}

	const { color, grade, safety } = getGradeDetails(score);

	return (
		<div className="gradeContainer">
			<div className="gradeImageContainer">
				<div className="gradeImage" id={color}>
					<p>{safety}</p>
					<p>
						{grade}/{score}점
					</p>
				</div>
			</div>
			<div className="gradeText">
				<p>반경 {distance}M</p>
				<p>
					{dataType === "CCTV"
						? `cctv ${dataCount || 0} 개수`
						: dataType === "보안등"
						? `보안등 ${dataCount || 0} 개수`
						: "선택된 데이터 유형이 없습니다"}
				</p>
			</div>
		</div>
	);
}

export default GradeView;
