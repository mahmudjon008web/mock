const ServerError = (res, error) => {
    return res.status(500).json({
        error: error.message
    })
}
const ValidError = (res, statusError, message) => {
    return res.status(statusError).json({
        error: message
    })
}
module.exports = {
    ServerError,
    ValidError
}