const AppError = require('./../utils/appError');

const sendErrorDev = (err, res) => {
    if (err.isOperational) {
        res.status(err.statusCode).json({
            status: err.status,
            error: err,
            message: err.message,
            stack: err.stack
        });
    }
    else {
        res.status(500).json({
            status: 'error',
            message: 'Something went wrong'
        });
    }
};

const sendErrorProd = (err, res) => {
    if (err.isOperational) {
        res.status(err.statusCode || 500).json({
            status: err.status || 'error',
            message: err.message
        });
    }
    else {
        res.status(500).json({
            status: 'error',
            message: 'Something went wrong'
        });
    }

};

const handleCastErrDB = err => {
    const message = `Invalid ${err.path}: ${err.value}`;
    return new AppError(message, 400);
};

const handleDuplicateFieldsDB = err => {
    const value = err.errmsg.match(/(["'])(\\?.)*?\1/)[0];
    const message = `Duplicate field value: ${value}. Please use another value`;
    return new AppError(message, 400);
};

const handleValidationErrDB = err => {
    const errors = Object.values(err.errors).map(el => el.message);
    const message = `Invalid input data. ${errors.join(', ')}`;
    return new AppError(message, 400);
};

const handleJsonWebTokenErrorDB = err => {
    const message = 'Invalid token. Please log in again';
    return new AppError(message, 401);
}
handleTokenExpiredErrorDB = err => {
    message = 'Expired token. Please log in again';
    return new AppError(message, 401);
}

module.exports = (err, req, res, next) => {
    if (process.env.NODE_ENV === 'development') {
        if (err.name === 'CastError') err = handleCastErrDB(err);
        if (err.code === 11000) err = handleDuplicateFieldsDB(err);
        if (err.name === 'ValidationError') err = handleValidationErrDB(err);
        if (err.name === 'JsonWebTokenError') err = handleJsonWebTokenErrorDB(err);
        if (err.name === 'TokenExpiredError') err = handleTokenExpiredErrorDB(err);
        sendErrorDev(err, res);
    }
    else if (process.env.NODE_ENV === 'production') {
        if (err.name === 'CastError') err = handleCastErrDB(err);
        if (err.code === 11000) err = handleDuplicateFieldsDB(err);
        if (err.name === 'ValidationError') err = handleValidationErrDB(err);
        if (err.name === 'JsonWebTokenError') err = handleJsonWebTokenErrorDB(err);
        if (err.name === 'TokenExpiredError') err = handleTokenExpiredErrorDB(err);
        sendErrorProd(err, res);
    }
};