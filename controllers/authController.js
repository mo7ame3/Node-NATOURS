const User = require('./../models/userModel');
const catchAsync = require('./../utils/catchAsync');
const { promisify } = require('util');
const jwt = require('jsonwebtoken');
const AppError = require('./../utils/appError');

const signToken = id => {
    return jwt.sign({ id: id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_IN
    });
};

exports.signup = catchAsync(async (req, res) => {
    const newUser = await User.create(req.body);
    newUser.password = undefined; // Hide the password in the response   
    newUser.passwordConfirmation = undefined; // Hide the passwordConfirmation in the response
    const token = signToken(newUser._id);
    res.status(201).json({
        status: 'success',
        token,
        data: {
            user: newUser,
        }
    });
});

exports.login = catchAsync(async (req, res, next) => {
    const {
        email,
        password
    } = req.body;

    //* 1) Check if email and password exist
    if (!email || !password) {
        return next(new AppError('Please provide email and password', 400));
    }

    //! 2) Check if user exists && password is correct
    const user = await User.findOne({
        email
    }).select('+password');
    if (!user) {
        return next(new AppError('Incorrect email', 401));
    }
    const correct = await user.correctPassword(password, user.password);

    if (!correct) {
        return next(new AppError('Incorrect email or password', 401));
    }

    //? 3) If everything is ok, send token to client
    const token = signToken(user._id);
    res.status(200).json({
        status: 'success',
        token,

    });
});

exports.protect = catchAsync(async (req, res, next) => {
    //* 1) GET TOKEN AND CHECK IT
    let token;
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        token = req.headers.authorization.split(' ')[1];
    }

    if (!token) {
        return next(new AppError('You are not logged in! Please login to get access', 401));
    }
    //? 2) VERIFICATION TOKEN
    const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);
    //TODO 3) CHECK IF USER EXISTS 
    const freshUser = await User.findById(decoded.id);
    if (!freshUser) {
        return next(new AppError('User account has been changed. Please login again', 401));
    }
    //! 4) CHECK IF USER CHANGE PASSWORD AFTER THE TOKEN WAS ISSUED
    if (await freshUser.changePassword(decoded.iat)) {
        return next(new AppError('User recently changed password. Please login again', 401));
    }

    req.user = freshUser;
    next();
});

exports.restrictTo = (...roles) => {
    return (req, res, next) => {
        if (!roles.includes(req.user.role)) {
            return next(new AppError('You do not have permission to perform this action', 403));
        }
        next();
    }
}