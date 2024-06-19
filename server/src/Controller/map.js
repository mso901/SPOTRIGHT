const express = require('express');
const router = express.Router();

const service = require('../Service/mapService');
const middleware = require('../middleware/controllerTools');

// 에러 메시지 정의 클래스
const error = require('../config/error');

router.get('/cctv',
    // 유효성 검사 미들웨어
    middleware.validation({
        longitude: /^[0-9.0-9]{9,10}$/,
        latitude: /^[0-9.0-9]{9,10}$/,
        distance: /^[0-9]{1,5}$/
    }, error),
    async (req, res, next) => {
        try {
            const tableName = 'cctv';
            const { longitude, latitude, distance } = req.query;
            const data = await service.getLocations(tableName, longitude, latitude, distance, error);
            res.status(200).json(data);
        } catch (err) {
            next(err);
        }
    }
);

router.get('/security-light',
    // 유효성 검사 미들웨어
    middleware.validation({
        longitude: /^[0-9.0-9]{9,10}$/,
        latitude: /^[0-9.0-9]{9,10}$/,
        distance: /^[0-9]{1,5}$/
    }, error),
    async (req, res, next) => {
        try {
            const tableName = 'security_light';
            const { longitude, latitude, distance } = req.query;
            const data = await service.getLocations(tableName, longitude, latitude, distance, error);
            res.status(200).json(data);
        } catch (err) {
            next(err);
        }
    }
);

router.get('/safety-score',
    // 유효성 검사 미들웨어
    middleware.validation({
        longitude: /^[0-9.0-9]{9,10}$/,
        latitude: /^[0-9.0-9]{9,10}$/,
        distance: /^[0-9]{1,5}$/
    }, error),
    async (req, res, next) => {
        try {
            const { longitude, latitude, distance } = req.query;
            const data = await service.getScore(longitude, latitude, distance, error);
            res.status(200).json({ longitude, latitude, Safety_score: data });
        } catch (err) {
            next(err);
        }
    }
);

module.exports = router;
