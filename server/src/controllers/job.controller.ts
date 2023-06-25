import { NextFunction, Request, Response } from 'express';
import Job from '../models/job.models.js';
import { BadRequestError, NotFoundError, ServerError, UnauthorizeError } from '../errors/Errors.js';

export const findById = async (req: Request, res: Response, next: NextFunction) => {
	res.json({ status: 'ok', data: req.user });
};

export const createJob = async (req: Request, res: Response, next: NextFunction) => {
	res.json({ status: 'ok', data: req.user });
};

export const getAllJobsByIdCompany = async (req: Request, res: Response, next: NextFunction) => {
	res.json({ status: 'ok', data: req.user });
};

/* Routes For Employee */
export const getAllJobs = async (req: Request, res: Response, next: NextFunction) => {
	res.json({ status: 'ok', data: req.user });
};
export const updateById = async (req: Request, res: Response, next: NextFunction) => {
	res.json({ status: 'ok', data: req.user });
};

/* Routes For Admin */
export const deleteById = async (req: Request, res: Response, next: NextFunction) => {
	res.json({ status: 'ok', data: req.user });
};
