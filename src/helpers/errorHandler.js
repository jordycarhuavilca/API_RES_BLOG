class ConnectionError extends Error{
    constructor(msg,statusCode){
        super(msg)
        this.message = msg
        this.name = 'ConnectionError'
        this.statusCode = statusCode

    }
}

class ValidateError extends Error{
    constructor(msg,statusCode){
        super(msg,statusCode)
        this.message = msg
        this.name = 'ValidationError'
        this.statusCode = statusCode
    }
}

class NotFoundError extends Error{
    constructor(msg,statusCode){
        super(msg)
        this.message = msg
        this.name = 'NotFoundError'
        this.statusCode = statusCode
    }
}

class InternalServerError extends Error{
    constructor(msg,statusCode){
        super(msg)
        this.message = msg
        this.name = 'InternalServerError'
        this.statusCode = statusCode
    }
}

class TransactionError extends Error{
    constructor(msg,statusCode){
        super(msg)
        this.message = msg
        this.name = 'TransactionError'
        this.statusCode = statusCode
    }
}

class HttpError extends Error{
    constructor(msg,statusCode){
        super(msg)
        this.message = msg
        this.name = 'HttpError'
        this.statusCode = statusCode
    }
}

module.exports = {
    ConnectionError,
    ValidateError,
    NotFoundError,
    InternalServerError,
    TransactionError,
    HttpError
}