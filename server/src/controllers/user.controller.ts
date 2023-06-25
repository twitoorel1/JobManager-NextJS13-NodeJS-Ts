import { Request, Response, NextFunction } from 'express';
import User from '../models/user.model.js';
import moment from 'moment';
import { REMOVE_USER_FIELDS } from '../constants/user.constants.js';
import { BadRequestError, ForbiddenError, NotFoundError, ServerError, UnauthorizeError } from '../errors/Errors.js';
import { registerRequestSchema, editPasswordRequestSchema } from '../validators/authRequests.schema.js';
import errorHandler from '../errors/errorHandlerYup.js';
import { sendEmail } from '../services/sendEmail.services.js';

/* Routes For All User */
export const findById = async (req: Request, res: Response, next: NextFunction) => {
	if (req.user.userId === req.params.id || req.user.role === 'admin') {
		const user = await User.findById(req.params.id).select(REMOVE_USER_FIELDS);
		if (!user) return next(new NotFoundError('User not found'));
		res.status(200).json({ data: user });
	} else {
		return next(new ForbiddenError('You do not have access'));
	}
};

export const deleteUserById = async (req: Request, res: Response, next: NextFunction) => {
	const user = await User.findByIdAndDelete(req.params.id).select(REMOVE_USER_FIELDS);
	if (!user) return next(new NotFoundError('User not found'));
	res.status(200).send('User deleted successfully');
};
// export const deleteUserById = async (req: Request, res: Response, next: NextFunction) => {
// 	if (req.user.userId === req.params.id || req.user.role === 'admin') {
// 		const user = await User.findByIdAndDelete(req.params.id).select(REMOVE_USER_FIELDS);
// 		if (!user) return next(new NotFoundError('User not found'));
// 		res.status(200).send('User deleted successfully');
// 	} else {
// 		return next(new ForbiddenError('You do not have access'));
// 	}
// };

export const updateUserById = async (req: Request, res: Response, next: NextFunction) => {
	if (req.user.userId === req.params.id || req.user.role === 'admin') {
		const user = await User.findByIdAndUpdate(
			req.params.id,
			{
				$set: {
					...req.body,
					updatedAt: moment().format('YYYY-MM-DD HH:mm:ss')
				}
			},
			{ new: true }
		);
		if (!user) return next(new NotFoundError('User not found'));
		res.status(200).json({ msg: 'User updated successfully', data: user });
	} else {
		return next(new ForbiddenError('You do not have access'));
	}
};

export async function editPasswordById(req: Request, res: Response, next: NextFunction) {
	if (req.user.userId === req.params.id || req.user.role === 'admin') {
		await editPasswordRequestSchema.validate(req.body, { abortEarly: false });
		const { oldPassword, newPassword, confirmPassword } = req.body;

		const user = await User.findById(req.params.id);
		if (!user) return next(new NotFoundError('User not found'));

		const isValidPassword = await user.comparePassword(oldPassword);
		if (isValidPassword === false) return next(new UnauthorizeError('Invalid password'));

		if (newPassword !== confirmPassword) {
			return next(new BadRequestError("Password Don't match"));
		}

		if (oldPassword === newPassword) {
			return next(new BadRequestError('New password cannot be same as old password'));
		}

		await user.editPassword(newPassword);
		res.status(200).json({ msg: 'Password User updated successfully' });
	} else {
		return next(new ForbiddenError('You do not have access'));
	}
}

export async function editImageProfileById(req: Request, res: Response, next: NextFunction) {
	try {
		if (req.user.userId === req.params.id || req.user.role === 'admin') {
			const { imgSRC } = req.body;

			// res.send(req.body);

			if (!req.file) return next(new UnauthorizeError('Please upload an image'));
			const { path: image } = req.file;

			const user = await User.findById(req.user.userId).select(REMOVE_USER_FIELDS);
			if (!user) return next(new NotFoundError('User not found'));

			await user.editImageProfile(image);

			res.send('Updated Image Profile');
		} else {
			return next(new ForbiddenError('You do not have access'));
		}
	} catch (error: any) {
		res.send(error.message);
	}
}

// Send Email
export async function sendEmailFromByUserId(req: Request, res: Response, next: NextFunction) {
	const { fullName, clientName, subject, description } = req.body;

	const user = await User.findById(req.user.userId).select(REMOVE_USER_FIELDS);
	if (!user) return next(new NotFoundError('User Not Found'));

	/*
	Required:
		// Email User = V
		// Subject = V
		// Body = V
	 */
	await sendEmail({
		from: `"${fullName} - ${subject}" <${user.email}>`,
		to: process.env.EMAIL_USER,
		subject,
		html: `
			FullName: ${fullName} <br/>
			Client: ${clientName} <br/>
			Subject: ${subject} <br/>
			Description: ${description} <br/>
		`
	});

	res.send(req.body);
}

//
/* Routes For Only Admin */
export async function createNewUser(req: Request, res: Response, next: NextFunction) {
	try {
		await registerRequestSchema.validate(req.body, { abortEarly: false });
		const { password, confirmPassword } = req.body;

		if (password !== confirmPassword) {
			return next(new BadRequestError("Password Don't match"));
		}

		if (!req.file) return next(new UnauthorizeError('Please upload an image')); // Stop For Dev Mode
		const { path: image } = req.file;

		const user = await User.create({ ...req.body, imgSRC: image.replace('\\', '/') });
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

export const getAllUsers = async (req: Request, res: Response, next: NextFunction) => {
	const users = await User.find().select(REMOVE_USER_FIELDS).populate('company');
	if (!users) return next(new NotFoundError('Users not found'));
	res.status(200).json({ allUsers: users });
};
