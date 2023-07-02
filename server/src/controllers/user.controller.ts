import { Request, Response, NextFunction } from 'express';
import User from '../models/user.model';
import Company from '../models/company.model';
import moment from 'moment';
import { BadRequestError, NotFoundError, ServerError, UnauthorizeError } from '../errors/Errors';
import { REMOVE_USER_FIELDS, REMOVE_COMPANY_FIELDS } from '../constants/user.constants';
import { editPasswordRequestSchema, registerRequestSchema } from '../validators/authRequests.schema';
import errorHandlerYup from '../errors/errorHandlerYup';
import { sendEmail } from '../services';
import { ERoles, ICompany } from '../types/global';

/* Routes For All User */
export const findById = async (req: Request, res: Response, next: NextFunction) => {
	const userFind = await User.findById(req.params.userId).select(REMOVE_USER_FIELDS).populate({ path: 'company', select: REMOVE_COMPANY_FIELDS });
	if (!userFind) return next(new NotFoundError('User not found'));
	res.status(200).json({ error: false, user: userFind });
};

export const FindAllUsersFromCompany = async (req: Request, res: Response, next: NextFunction) => {
	const usersWorkingInCompany = await User.find({ company: req.params.idCompany }).select(REMOVE_USER_FIELDS).populate({ path: 'company', select: REMOVE_COMPANY_FIELDS });
	if (!usersWorkingInCompany) return next(new NotFoundError('Users not found'));
	res.status(200).json({ error: false, users: usersWorkingInCompany });
};

export const updateUserById = async (req: Request, res: Response, next: NextFunction) => {
	const user = await User.findByIdAndUpdate(
		req.params.userId,
		{
			$set: {
				...req.body,
				updatedAt: moment().format('YYYY-MM-DD HH:mm:ss')
			}
		},
		{ new: true }
	);
	if (!user) return next(new NotFoundError('User not found'));
	res.status(200).json({ error: false, message: 'User updated successfully', user });
};

export const editPasswordById = async (req: Request, res: Response, next: NextFunction) => {
	await editPasswordRequestSchema.validate(req.body, { abortEarly: false });
	const { oldPassword, newPassword, confirmPassword } = req.body;

	const user = await User.findById(req.params.userId);
	if (!user) return next(new NotFoundError('User not found'));

	const isValidPassword = await user.comparePassword(oldPassword);
	if (isValidPassword === false) return next(new UnauthorizeError('Invalid password'));
	if (newPassword !== confirmPassword) return next(new BadRequestError("Password Don't match"));
	if (oldPassword === newPassword) return next(new BadRequestError('New password cannot be same as old password'));

	await user.editPassword(newPassword);
	res.status(200).json({ error: false, message: 'Password User updated successfully' });
};

export const editImageProfileById = async (req: Request, res: Response, next: NextFunction) => {
	if (!req.file) return next(new UnauthorizeError('Please upload an image'));
	const { path: image } = req.file;
	const user = await User.findById(req.params.userId).select(REMOVE_USER_FIELDS);
	if (!user) return next(new NotFoundError('User not found'));

	await user.editImageProfile(image);
	res.status(200).json({ error: false, message: 'Updated Image Profile' });
};

export const sendEmailByUserId = async (req: Request, res: Response, next: NextFunction) => {
	const { subject, description } = req.body;

	const user = await User.findById(req.user.userId).select(REMOVE_USER_FIELDS).populate({ path: 'company', select: REMOVE_COMPANY_FIELDS });
	if (!user) return next(new NotFoundError('User Not Found'));
	const clientName = (user?.company as ICompany)?.name;

	/*
	Required:
		// Email User = V
		// Subject = V
		// Body = V
	 */
	await sendEmail({
		from: `"${user.firstName} ${user.lastName} - ${subject}" <${user.email}>`,
		to: process.env.EMAIL_USER,
		subject,
		html: `
			FullName: ${user.firstName} ${user.lastName} <br/>
			Client: ${clientName} <br/>
			Subject: ${subject} <br/>
			Description: ${description} <br/>
		`
	});

	res.status(200).json({ error: false, message: 'Send Email Success', email: req.body });
};

//Employee +
/* Routes For employee And Admin */
export const findAllUsers = async (req: Request, res: Response, next: NextFunction) => {
	const users = await User.find().select(REMOVE_USER_FIELDS).populate({ path: 'company', select: REMOVE_COMPANY_FIELDS });
	if (!users) return next(new NotFoundError('Users not found'));
	res.status(200).json({ error: false, allUsers: users });
};

//Admin
/* Routes For Only Admin */
export const createNewUser = async (req: Request, res: Response, next: NextFunction) => {
	try {
		await registerRequestSchema.validate(req.body, { abortEarly: false });
		const { username, email, password, confirmPassword } = req.body;

		const findUser = await User.findOne({ $or: [{ username }, { email }] });
		if (findUser) return next(new UnauthorizeError('Username Or Email Already Exists'));
		if (password !== confirmPassword) return next(new UnauthorizeError("Password Don't match"));

		if (!req.file) return next(new BadRequestError('Please upload an image'));
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
};

export const deleteUserByUserId = async (req: Request, res: Response, next: NextFunction) => {
	const findUser = await User.findById(req.params.userId).select(REMOVE_USER_FIELDS);
	if (!findUser) return next(new NotFoundError('User not found'));
	await Company.findByIdAndUpdate(findUser.company, { $inc: { employeeNumber: -1 } }, { new: true });
	await User.findByIdAndDelete(req.params.userId).select(REMOVE_USER_FIELDS);
	res.status(200).json({ error: false, message: 'User deleted successfully!' });
};
