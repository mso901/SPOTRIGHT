// 데이터 베이스 연결 에러
class DbConnectionError extends Error {
    constructor(message) {
        super(message);
        this.statusCode = 500;
    }
}

// 데이터가 존재하지 않음
class DbNoSearchData extends Error {
    constructor(message) {
        super(message);
        this.statusCode = 404;
    }
}

// 유효성 검사 에러
class ValidationError extends Error {
    constructor(message) {
        super(message);
        this.statusCode = 400;
    }
}

module.exports = {
    DbConnectionError,
    DbNoSearchData,
    ValidationError
};