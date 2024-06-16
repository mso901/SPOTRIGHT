import React from "react";
import "./Data.css";

// api 작성 후 사용될 예정
// async function getScore(){
//   fetch('api url').then((res)=> res.json()).then((data)=>{
//     const score = data.테이블명?;
//   })
// }

// dummy (min 0 ~ max 100)
const score = 30;

function CheckGrade() {
  if (score >= 70) {
    return "green";
  } else if (score >= 40) {
    return "yellow";
  } else {
    return "red";
  }
}

//View
function GradeView() {
  return (
    <>
      <h3>종합 점수</h3>
      <div class="gradeContainer">
        <div class="gradeImage" id={CheckGrade()}>
          {score}
        </div>
      </div>
    </>
  );
}

export default GradeView;
