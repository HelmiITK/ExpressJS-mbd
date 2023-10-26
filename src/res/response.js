const response = (statusCode, data, message, res) => {
    res.status(statusCode).json({
        payload: {
            message: message,
            status_code: statusCode,
            result: data,
        }
    })
}

module.exports = response