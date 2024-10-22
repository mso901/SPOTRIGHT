// 간단한 유효성 검사 (라이브러리 사용 안한 버전) (프로젝트에 맞는 유효성 검사 라이브러리 적용 검토)
function validation(form, error) {
    return (req, res, next) => {
        for (let key in form) {
            if (!form[key].test(req.query[key])) {
                next(new error.ValidationError("보낸 데이터 형식이 잘못되었습니다!"));
            }
        }
        next();
    }
}

module.exports = { validation }