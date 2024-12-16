const express = require('express');
const userController = require('./../controllers/userController');
const authController = require('./../controllers/authController');

const router = express.Router();

router.post('/signup', authController.signup);
router.post('/login', authController.login);

router
  .route('/')
  .get(userController.getAllUsers)
  .post(userController.createUser);

router.route('/forgotPassword').post(authController.forgotPassword);

router.patch('/resetPassword/:token', authController.resetPassword);

router.patch(
  '/updatePassword',
  authController.protect,
  authController.updatePassword,
);

router.patch('/updateUser', authController.protect, userController.updateUser);
router.delete('/deleteUser', authController.protect, userController.deleteUser);

// router
//   .route('/:id')
//   .get(userController.getUser)
//   .delete(userController.deleteUser);

module.exports = router;
