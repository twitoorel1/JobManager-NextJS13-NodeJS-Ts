import { NextFunction, Request, Response } from 'express';
import Company from '../models/company.model.js';
import { BadRequestError, NotFoundError, ServerError, UnauthorizeError } from '../errors/Errors.js';
import errorHandler from '../errors/errorHandlerYup.js';

/* Routes For Employee */
export const findById = async (req: Request, res: Response, next: NextFunction) => {
	res.json({ status: 'ok', data: req.user });
};

export const getAllCompany = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const allCompany = await Company.find();
		if (!allCompany) return next(new BadRequestError("company's already exists"));
		res.status(201).send({ error: false, data: allCompany });
	} catch (error: any) {
		if (typeof 'MongoError') {
			return next(new ServerError(error.message));
		}
		if (error.name === 'ValidationError') {
			return errorHandler(error, req, res, next);
		}
		res.send(error.message);
	}
};

export const createCompany = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const company = await Company.create(req.body);
		if (company) return next(new BadRequestError('company already exists'));
		res.status(201).send({ error: false, data: company });
	} catch (error: any) {
		if (typeof 'MongoError') {
			return next(new ServerError(error.message));
		}
		if (error.name === 'ValidationError') {
			return errorHandler(error, req, res, next);
		}
		res.send(error.message);
	}
};

export const updateById = async (req: Request, res: Response, next: NextFunction) => {
	res.json({ status: 'ok', data: req.user });
};

/* Routes For Admin */
export const deleteById = async (req: Request, res: Response, next: NextFunction) => {
	res.json({ status: 'ok', data: req.user });
};
