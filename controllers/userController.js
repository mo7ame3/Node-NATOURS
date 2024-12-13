const User = require('./../models/userModel');
const APIFeatures = require('./../utils/apiFeatures');
const CatchAsync = require('./../utils/catchAsync');
const AppError = require('./../utils/appError');
const catchAsync = require('./../utils/catchAsync');

exports.getAllUsers = catchAsync(async (req, res) => {
    const users = await User.find();

    //! Send Response
    res.status(200).json({
        status: 'success',
        requestedAt: req.requestTime,
        results: users.length,
        data: {
            users,
        },
    });
});
exports.getUser = catchAsync(async (req, res, next) => {
    const user = await User.findById(req.params.id);
    if (!user) {
        return next(new AppError('Not user found with that id', 404));
    }
    return res.status(200).json({
        status: 'success',
        requestedAt: req.requestTime,
        data: {
            user,
        },
    });
});

exports.createUser = (req, res) => {
    res.status(400).json({
        status: 'fail',
        message: 'Not implemented'
    });
};
exports.updateUser = (req, res) => {
    res.status(400).json({
        status: 'fail',
        message: 'Not implemented'
    });
};
exports.deleteUser = (req, res) => {
    res.status(400).json({
        status: 'fail',
        message: 'Not implemented'
    });
};