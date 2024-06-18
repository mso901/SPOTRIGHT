/** @format */

import React, { useState, useEffect } from "react"
import axios from "axios"
import "./Data.css"

const fetchScore = async (longitude, latitude, distance, setScore) => {
  try {
    console.log("Fetching score...")
    // const response = await axios.get(`/map/safety-score`, {
    //   params: {
    //     longitude: longitude,
    //     latitude: latitude,
    //     distance: distance,
    //   },
    // })
    // console.log("Response status:", response.status)
    // console.log("Response headers:", response.headers)
    // console.log("Response data:", response.data)

    const score = 30 //response.data
    setScore(score)
  } catch (error) {
    console.error("Error fetching the score:", error)
    setScore(null)
  }
}

function getGradeDetails(score) {
  if (score >= 70) {
    return { color: "green", grade: "1등급" }
  } else if (score >= 40) {
    return { color: "yellow", grade: "2등급" }
  } else {
    return { color: "red", grade: "3등급" }
  }
}

function GradeView({ longitude, latitude, distance }) {
  const [score, setScore] = useState(null)

  useEffect(() => {
    fetchScore(longitude, latitude, distance, setScore)
  }, [longitude, latitude, distance])

  if (score === null) {
    return <div>Loading...</div> 
  }

  const { color, grade } = getGradeDetails(score)

  return (
    <div className="gradeContainer">
      <div className="gradeImage" id={color}></div>
      <div className="gradeText">
        <p>{grade}</p>
        <p>{score}점</p>
      </div>
    </div>
  )
}

export default GradeView
