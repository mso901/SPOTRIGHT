/** @format */

import React, { useState, useEffect } from "react"
import axios from "axios"
import "./Data.css"

const fetchScore = async (longitude, latitude, distance, setScore) => {
  // const baseUrl = "http://localhost:3000/"

  try {
    // const response = await axios.get(`${baseUrl}/map/safety-score`, {
    //   params: {
    //     longitude: longitude,
    //     latitude: latitude,
    //     distance: distance,
    //   },
    // })
    // console.log("res:", response.data)
    // const score = response.data["Safety_score"]
    const score = "55"
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

function getGradeDetails(score) {
  if (score >= 70) {
    return { color: "green", grade: "1등급", safety:"안전" }
  } else if (score >= 40) {
    return { color: "yellow", grade: "2등급", safety:"주의" }
  } else {
    return { color: "red", grade: "3등급", safety:"경고" }
  }
}

function GradeView({ lon, lat, distance }) {
  const [score, setScore] = useState(null)

  useEffect(() => {
    const longitude1 = formatCoordinate(lon)
    const latitude2 = formatCoordinate(lat)
    fetchScore("127.084032", "37.483869", "500", setScore)
  }, [lon, lat, distance])

  if (score === null) {
    return <div>Loading...</div>
  }

  const { color, grade, safety } = getGradeDetails(score)

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
        <p>반경 1km</p>
        <p>cctv 개수</p>
        <p>보안등 개수</p>
      </div>
    </div>
  )
}

export default GradeView
