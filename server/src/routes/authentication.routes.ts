import express from 'express';
import catchAsyncError from '../errors/catchAsyncError';
import { forgotPassword, isLogin, login, logout, register, resetPassword } from '../controllers/authentication.controller';
import { upload } from '../middlewares/uploadImage.middleware';
const router = express.Router();

router.post('/register', upload.single('imgSrc'), catchAsyncError(register));
router.post('/login', catchAsyncError(login));
router.post('/logout', catchAsyncError(logout));
router.post('/isLogin', catchAsyncError(isLogin));
router.post('/forgotPassword', catchAsyncError(forgotPassword));
router.post('/reset/:resetToken', catchAsyncError(resetPassword));

export default router;
