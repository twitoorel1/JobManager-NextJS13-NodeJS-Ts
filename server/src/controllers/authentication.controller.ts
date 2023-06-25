import { NextFunction, Request, Response } from 'express';
import User from '../models/user.model.js';
import { BadRequestError, NotFoundError, ServerError, UnauthorizeError } from '../errors/Errors.js';
import { createAccessToken, createRefreshToken, verifyAccessToken } from '../services/jwt.services.js';
import { JwtPayload } from 'jsonwebtoken';
import { SELECTED_USER_FIELDS, NameSite } from '../constants/user.constants.js';
import { registerRequestSchema, loginRequestSchema } from '../validators/authRequests.schema.js';
import errorHandler from '../errors/errorHandlerYup.js';
import { sendEmail } from '../services/sendEmail.services.js';
import moment from 'moment';

export async function register(req: Request, res: Response, next: NextFunction) {
	try {
		await registerRequestSchema.validate(req.body, { abortEarly: false });
		const { firstName, lastName, email, username, password, confirmPassword, phoneNumber, role } = req.body;

		if (password !== confirmPassword) {
			return next(new BadRequestError("Password Don't match"));
		}

		if (!req.file) return next(new UnauthorizeError('Please upload an image')); // Stop For Dev Mode
		const { path: image } = req.file;

		const user = await User.create({
			...req.body,
			imgSRC: image.replace('\\', '/')
		});
		res.status(201).send({ error: false, data: user });
	} catch (error: any) {
		if (typeof 'MongoError') {
			return next(new ServerError(error.message));
		}
		if (error.name === 'ValidationError') {
			return errorHandler(error, req, res, next);
		}
		console.log(error.message);
	}
}

export async function login(req: Request, res: Response, next: NextFunction) {
	try {
		await loginRequestSchema.validate(req.body, { abortEarly: false });
		const { username, password } = req.body;

		if (!username || !password) return next(new BadRequestError('Username or password not provided'));

		const user = await User.findOne({ username });
		if (!user) return next(new NotFoundError('User not found'));

		const isValidPassword = await user.comparePassword(password);
		if (isValidPassword === false) return next(new UnauthorizeError('Invalid username or password'));

		const accessToken = createAccessToken(user.id, user.role);
		const refreshToken = createRefreshToken(user.id, user.role);

		user.setJwtTokens(accessToken, refreshToken);
		user.lastConnected();
		res.status(200).send({ error: false, data: user, token: accessToken });
	} catch (error: any) {
		if (typeof 'MongoError') {
			return next(new ServerError(error.message));
		}
		if (error.name === 'ValidationError') {
			return errorHandler(error, req, res, next);
		}
		console.log(error.message);
	}
}

export async function isLogin(req: Request, res: Response, next: NextFunction) {
	const { token } = req.body;
	if (!token) return next(new BadRequestError('Token is required'));

	const { userId } = verifyAccessToken(token) as JwtPayload;
	const user = await User.findById(userId).select(SELECTED_USER_FIELDS);
	// .populate("company");

	res.status(200).send({ isAuthenticated: true, user: user });
}

export async function logout(req: Request, res: Response, next: NextFunction) {
	try {
		const { token } = req.body;
		const { userId } = req.params;
		if (!token && !userId) return next(new BadRequestError());
		const user = await User.findOne({ _id: userId });
		user?.deleteAcToken();
		res.status(200).send('Logout Successful').end();
	} catch (error: any) {
		console.log(error.message);
	}
}

export async function forgotPassword(req: Request, res: Response, next: NextFunction) {
	const user = await User.findOne({ email: req.body.email });
	if (!user) return next(new NotFoundError('User Not Found'));
	const resetToken = await user.forgotPassword();

	await sendEmail({
		from: `בקשת לאיפוס סיסמה <${process.env.EMAIL_USER}>`,
		to: user.email,
		subject: `${NameSite} - תמיכה טכנית`,
		html: `
		<p>Reset Password Link Here:</p>
		<h1><strong><u>URL For Testing</u></strong></h1>
		<h5><a style="color: "red"; background-color:"blue" href="${process.env.CLIENT_ENDPOINT}/reset/${resetToken}">Link Here</a></h5>
		`
	});

	res.json({ message: 'Check your email', resetToken });
}

export async function resetPassword(req: Request, res: Response, next: NextFunction) {
	const { password } = req.body;
	const { resetToken } = req.params;
	const user = await User.findOne({
		resetToken,
		expireToken: { $gt: Date.now() }
	});
	if (!user) return next(new NotFoundError('Try again, session expired'));
	await user.resetPassword(password);
	res.json({ message: 'Password updated successfully' });
}
