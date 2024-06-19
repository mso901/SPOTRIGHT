const express = require("express");
const app = express();

require("dotenv").config();
const port = process.env.SERVICE_PORT;

const mapRouter = require('./server/src/Controller/map');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/map', mapRouter);

app.use((req, res, next) => {
    const error = new Error("잘못된 경로 입니다!");
    error.statusCode = 404;
    next(error);
});

app.use((err, req, res, next) => {
    const { statusCode, message } = err;
    if (!statusCode) {
        res.statusCode = 500;
        res.json({ error: "서버에서 문제가 발생했습니다. 자세한 사항은 개발자에게 문의해주세요!" });
    }
    res.statusCode = statusCode;
    res.json({ error: message });
});

app.listen(port, () => {
    console.log(`http://localhost:` + port + `/`);
});
