const express = require('express');
const userController = require('./../controllers/userController');
const authController = require('./../controllers/authController');

const router = express.Router();

router.post('/signup', authController.signup);
router.post('/login', authController.login);
router.route('/forgotPassword').post(authController.forgotPassword);
router.patch('/resetPassword/:token', authController.resetPassword);

router.use(authController.protect);
router.patch('/updateMe', userController.updateMe);
router.patch('/updatePassword', authController.updatePassword);
router.delete('/deleteMe', userController.deleteMe);
router.get('/me', userController.getMe, userController.getUser);
router.route('/:id').patch(userController.updateUser);

router.use(authController.restrictTo('admin'));
router.route('/').get(userController.getAllUsers);
router.route('/:id').delete(userController.deleteUser);
module.exports = router;
