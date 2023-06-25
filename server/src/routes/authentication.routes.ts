import express from 'express';
import catchAsyncError from '../errors/catchAsyncError.js';
import { register, login, isLogin, logout, forgotPassword, resetPassword } from '../controllers/authentication.controller.js';
import { upload } from '../middlewares/uploadImage.middleware.js';
import { authRole } from '../middlewares/authentication.middleware.js';
import { authJwtTokenVerify } from '../middlewares/authentication.middleware.js';
import { ERoles } from '../types/global.js';
const router = express.Router();

// upload.single("imgSRC"),
router.post('/register', upload.single('imgSRC'), catchAsyncError(register));
router.post('/login', catchAsyncError(login));
router.post('/isLogin', catchAsyncError(isLogin));
router.post('/logout/:userId', catchAsyncError(logout));
router.post('/forgotPassword', catchAsyncError(forgotPassword));
router.post('/reset/:resetToken', catchAsyncError(resetPassword));

export default router;
