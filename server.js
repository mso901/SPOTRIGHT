/** @format */

const express = require("express")
const app = express()

require("dotenv").config()
const port = process.env.SERVICE_PORT

const path = require("path")
const cors = require("cors")

const corsOptions = {
  origin: process.env.MY_WEB_URL, // 환경변수로 설정 예정
  credentials: true,
}

const mapRouter = require("./src/Controller/map")

app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(express.static(path.join(__dirname, "/build")))
app.use(cors(corsOptions)) // 옵션에 설정한 URL에서 제한 없이 요청을 보내고 응답을 받을 수 있습니다.

app.use("/map", mapRouter)

app.get("/", (req, res, next) => {
  res.sendFile(path.join(__dirname, "/build/index.html"))
})

app.use((req, res, next) => {
  const error = new Error("잘못된 경로 입니다!")
  error.statusCode = 404
  next(error)
})

app.use((err, req, res, next) => {
  const { statusCode, message } = err
  if (!statusCode) {
    res.statusCode = 500
    res.json({
      error:
        "서버에서 문제가 발생했습니다. 자세한 사항은 개발자에게 문의해주세요!",
    })
  }
  res.statusCode = statusCode
  res.json({ error: message })
})

app.listen(port, () => {
  console.log(`http://localhost:` + port + `/`)
})
