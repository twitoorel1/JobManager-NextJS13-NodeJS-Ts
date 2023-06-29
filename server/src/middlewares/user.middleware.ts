import { Request, Response, NextFunction, RequestHandler } from 'express';
import { BadRequestError, ForbiddenError } from '../errors/Errors';
import { ERoles } from '../types/global';
import User from '../models/user.model';
import Job from '../models/job.model';
import { REMOVE_USER_FIELDS } from '../constants/user.constants';

// CHECK IF USER WORKING IN COMPANY BY COMPANY ID
export const checkUserIfWorkingInCompany = (idCompany: string, userId: string): RequestHandler => {
	return async (req: Request, res: Response, next: NextFunction) => {
		try {
			const userCompany = await User.findById(userId).select('company').populate('company');
			if ((req.user.company._id === idCompany && userCompany?.company?.id.toString() === idCompany) || req.user.role === ERoles.employee) {
				if (userCompany?.company?.id.toString() !== idCompany) {
					next(new BadRequestError('Not Working In Company'));
				} else {
					next();
				}
			} else {
				next(new ForbiddenError('No Access'));
			}
		} catch (error: any) {
			next(new Error(error.message));
		}
	};
};

// CHECK IF JOB ID AND COMPANY ID ARE SAME And User Working in Company - Only Job Routes
export const checkJobIdIfSameIdCompany = (idJob: string, idCompany: string): RequestHandler => {
	return async (req: Request, res: Response, next: NextFunction) => {
		try {
			if (req.user.role === ERoles.employee) {
				next();
			} else {
				const userCompany = await User.findById(req.user.userId).select(REMOVE_USER_FIELDS).populate('company');
				if (userCompany?.company?._id.toString() !== idCompany) return next(new BadRequestError('You are not Working In Company'));

				const jobCompany = await Job.findById(idJob).select('company').populate('company');
				if (jobCompany?.company._id.toString() !== idCompany) return next(new BadRequestError('Company Or Job Not Found'));

				if (jobCompany?.company._id.toString() === idCompany) {
					next();
				} else {
					next(new BadRequestError('Job Not Exist In Company'));
				}
			}
		} catch (error: any) {
			next(new Error(error.message));
		}
	};
};

// CHECK USER ID BY AUTHENTICATION
export const checkUserIdByParam = (userId: string) => {
	return async (req: Request, res: Response, next: NextFunction) => {
		try {
			if (req.user.userId === userId || req.user.role === ERoles.employee) {
				next();
			} else {
				next(new ForbiddenError('You do not have access'));
			}
		} catch (error: any) {
			next(new Error(error.message));
		}
	};
};

// CHECK USER ID AND COMPANY ID IF USER WORKING IN COMPANY
export const checkUserByIdCompany = (idCompany: string) => {
	return async (req: Request, res: Response, next: NextFunction) => {
		try {
			const userCompany = await User.findById(req.user.userId).select('company').populate('company');

			if (userCompany?.company.id.toString() === idCompany || req.user.role === ERoles.employee) {
				next();
			} else {
				next(new ForbiddenError('You do not have access'));
			}
		} catch (error: any) {
			next(new Error(error.message));
		}
	};
};
