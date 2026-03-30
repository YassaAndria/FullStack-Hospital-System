
// middleware/error.middleware.js

// 404 Not Found Middleware
const notFound = (req, res, next) => {
    const err = new Error(`Not Found - ${req.originalUrl}`);
    res.status(404);
    next(err);
};

// Global Error Handler
const errorHandler = (err, req, res, next) => {
    console.error(err); // log error

    let statusCode = res.statusCode === 200 ? 500 : res.statusCode;
    let message = err.message;

    // 🔴 Mongoose Invalid ID (CastError)
    if (err.name === 'CastError') {
        statusCode = 400;
        message = `Invalid ID: ${err.value}`;
    }

    // 🔴 Mongoose Validation Error
    if (err.name === 'ValidationError') {
        statusCode = 400;
        message = Object.values(err.errors)
            .map(val => val.message)
            .join(', ');
    }

    // 🔴 Duplicate Key (like email)
    if (err.code === 11000) {
        statusCode = 400;
        message = `Duplicate field: ${Object.keys(err.keyValue)}`;
    }

    // 🔴 JWT Errors
    if (err.name === 'JsonWebTokenError') {
        statusCode = 401;
        message = 'Invalid token';
    }

    if (err.name === 'TokenExpiredError') {
        statusCode = 401;
        message = 'Token expired';
    }

    res.status(statusCode).json({
        success: false,
        message,
        // show stack only in development
        error: process.env.NODE_ENV === 'development' ? err.stack : undefined
    });
};

module.exports = { notFound, errorHandler };