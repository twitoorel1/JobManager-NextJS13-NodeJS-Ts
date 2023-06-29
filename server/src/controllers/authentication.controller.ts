import { NextFunction, Request, Response } from 'express';
import User from '../models/user.model';
import Company from '../models/company.model';
import { BadRequestError, NotFoundError, ServerError, UnauthorizeError } from '../errors/Errors';
import { sendEmail, createAccessToken, createRefreshToken, verifyAccessToken } from '../services';
import { JwtPayload } from 'jsonwebtoken';
import { NameSite, REMOVE_USER_FIELDS, REMOVE_USER_FIELDS_LOGIN, REMOVE_COMPANY_FIELDS } from '../constants/user.constants';
import { registerRequestSchema, loginRequestSchema, resetPasswordRequestSchema } from '../validators/authRequests.schema';
import errorHandlerYup from '../errors/errorHandlerYup';
import { ERoles } from '../types/global';

export async function register(req: Request, res: Response, next: NextFunction) {
	try {
		await registerRequestSchema.validate(req.body, { abortEarly: false });
		const { username, email, password, confirmPassword } = req.body;

		const findUser = await User.findOne({ $or: [{ username }, { email }] });
		if (findUser) return next(new UnauthorizeError('Username Or Email Already Exists'));
		if (password !== confirmPassword) return next(new BadRequestError("Password Don't match"));

		if (!req.file) return next(new UnauthorizeError('Please upload an image'));
		const { path: image } = req.file;

		if (!Object.values(ERoles).includes(req.body.role)) {
			return next(new BadRequestError('Invalid role'));
		}

		const findCompany = await Company.findById(req.body.company).select(REMOVE_COMPANY_FIELDS);
		if (!findCompany) return next(new NotFoundError('Company not found'));

		const user = await User.create({ ...req.body, role: req.body.role, imgSrc: image.replace('\\', '/') });
		await Company.findByIdAndUpdate(req.body.company, { $inc: { employeeNumber: 1 } }, { new: true });
		res.status(201).send({ error: false, data: user });
	} catch (error: any) {
		if (typeof 'MongoError') {
			return next(new ServerError(error.message));
		}
		if (error.name === 'ValidationError') {
			return errorHandlerYup(error, req, res, next);
		}
		console.log(error.message);
	}
}

export async function login(req: Request, res: Response, next: NextFunction) {
	try {
		await loginRequestSchema.validate(req.body, { abortEarly: false });
		const { username, password } = req.body;
		if (!username || !password) return next(new UnauthorizeError('Username or password not provided'));

		const user = await User.findOne({ username }).select(REMOVE_USER_FIELDS_LOGIN).populate({ path: 'company', select: REMOVE_COMPANY_FIELDS });
		if (!user) return next(new NotFoundError('User not found'));

		const isMatch = await user.comparePassword(password);
		if (!isMatch) return next(new UnauthorizeError('Username or password is incorrect'));

		const accessToken = createAccessToken(user.id, user.role, user.company.id);
		const refreshToken = createRefreshToken(user.id, user.role);

		user.setJwtTokens(accessToken, refreshToken);
		user.lastConnected();
		res.status(200).send({ error: false, data: user, token: accessToken });
	} catch (error: any) {
		if (typeof 'MongoError') {
			return next(new ServerError(error.message));
		}
		if (error.name === 'ValidationError') {
			return errorHandlerYup(error, req, res, next);
		}
		console.log(error.message);
	}
}

export async function logout(req: Request, res: Response, next: NextFunction) {
	try {
		const { token } = req.body;
		const { userId } = req.params;
		if (!token && !userId) return next(new UnauthorizeError('Token And UserID not provided'));
		const user = await User.findOne({ _id: userId });
		if (!user) return next(new NotFoundError('User not found'));
		user.deleteAcToken();
		res.status(200).send('Logout Successful').end();
	} catch (error: any) {
		console.log(error.message);
	}
}

export async function isLogin(req: Request, res: Response, next: NextFunction) {
	const { token } = req.body;
	if (!token) return next(new BadRequestError('Token is required'));
	const { userId } = verifyAccessToken(token) as JwtPayload;
	if (!userId) return next(new UnauthorizeError('Invalid Token'));
	const user = await User.findById(userId).select(REMOVE_USER_FIELDS).populate({ path: 'company', select: REMOVE_COMPANY_FIELDS });
	res.status(200).send({ isAuthenticated: true, user: user });
}

export async function forgotPassword(req: Request, res: Response, next: NextFunction) {
	const user = await User.findOne({ email: req.body.email });
	if (!user) return next(new NotFoundError('User not found'));
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

	res.status(200).send({ message: 'Check your email', resetToken });
}

export async function resetPassword(req: Request, res: Response, next: NextFunction) {
	await resetPasswordRequestSchema.validate(req.body, { abortEarly: false });
	const { password } = req.body;
	const { resetToken } = req.params;
	const user = await User.findOne({ resetToken, expireToken: { $gt: Date.now() } });
	if (!user) return next(new NotFoundError('User not found'));

	await user.resetPassword(password);
	await sendEmail({
		from: `הסיסמה אופסה בהצלחה <${process.env.EMAIL_USER}>`,
		to: user.email,
		subject: `${NameSite} - תמיכה טכנית`,
		html: `<h1>New Password Update</h1>`
	});

	res.status(200).send({ message: 'Password updated successfully' });
}
