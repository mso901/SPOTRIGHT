const model = require('../Model/mapModel');

async function getLocations(tableName, longitude, latitude, distance, error) {
    try {
        const data = await model.radiusSearch(tableName, longitude, latitude, distance, error);
        return data;
    } catch (err) {
        throw err;
    }
}

async function getScore(longitude, latitude, distance, error) {
    try {
        const tableNames = ['cctv', 'security_light'];
        let cctvCount = 0;
        let lightCount = 0;
        let cctvScore = 0;
        let lightScore = 0;

        for (let i = 0; i < tableNames.length; i++) {
            if (tableNames[i] == 'cctv') {
                cctvCount += await model.radiusCount(tableNames[i], longitude, latitude, distance, error);
            } else {
                lightCount += await model.radiusCount(tableNames[i], longitude, latitude, distance, error);
            }
        }

        cctvCount3 = (cctvCount*5)
        cctvScore = ((cctvCount3) / (cctvCount3+lightCount)) * 0.75;
        lightScore = (lightCount / (cctvCount3+lightCount)) * 0.25;
        totalScore = (cctvScore + lightScore) * 1.2 * 100;

        return totalScore.toFixed(1);

    } catch (err) {
        throw err;
    }
}

module.exports = { getLocations, getScore }