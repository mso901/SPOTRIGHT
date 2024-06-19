const pool = require('../config/mysql');

async function radiusSearch(tableName, longitude, latitude, distance, error) {
    const conn = await pool(error);
    try {
        const SQL = 'SELECT latitude,longitude FROM ' + tableName + ' WHERE ST_Distance_Sphere(POINT(?,?),POINT(longitude, latitude)) <= ?';
        const data = await conn.query(SQL, [longitude, latitude, distance]);

        // 데이터가 존재하지 않는다면
        if (data[0].length == 0) {
            throw new error.DbNoSearchData("데이터가 존재하지 않습니다!");
        }

        // 변경사항 데이터 베이스에 적용
        conn.commit();
        return data[0];

    } catch (err) {
        // 쿼리 실행 이전으로
        conn.rollback();
        throw err;
    } finally {
        // 할당된 connecter 해제
        conn.release();
    }
}

async function radiusCount(tableName, longitude, latitude, distance, error) {
    const conn = await pool(error);
    try {
        const SQL = 'SELECT COUNT(*) FROM ' + tableName + ' WHERE ST_Distance_Sphere(POINT(?,?),POINT(longitude, latitude)) <= ?';
        const data = await conn.query(SQL, [longitude, latitude, distance]);

        // 데이터가 존재하지 않는다면
        if (data[0].length == 0) {
            throw new error.DbNoSearchData("데이터가 존재하지 않습니다!");
        }

        // 변경사항 데이터 베이스에 적용
        conn.commit();
        return data[0][0]['COUNT(*)'];

    } catch (err) {
        // 쿼리 실행 이전으로
        conn.rollback();
        throw err;
    } finally {
        // 할당된 connecter 해제
        conn.release();
    }
}

module.exports = { radiusSearch, radiusCount }