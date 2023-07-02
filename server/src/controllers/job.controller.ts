import { NextFunction, Request, Response } from 'express';
import Job from '../models/job.model';
import Company from '../models/company.model';
import crypto from 'crypto';
import moment from 'moment';
import { NotFoundError, ServerError, BadRequestError } from '../errors/Errors';
import errorHandlerYup from '../errors/errorHandlerYup';
import { jobRequestSchema } from '../validators/jobRequests.schema';
import { REMOVE_COMPANY_FIELDS, REMOVE_JOB_FIELDS, REMOVE_USER_FIELDS } from '../constants/user.constants';
import { EStatusJob } from '../types/global';

export const findById = async (req: Request, res: Response, next: NextFunction) => {
	const job = await Job.findById(req.params.idJob).populate([
		{ path: 'company', select: REMOVE_COMPANY_FIELDS },
		{ path: 'createdJob', select: REMOVE_USER_FIELDS }
	]);
	if (!job) return next(new NotFoundError('Job not found'));
	res.status(201).json({ error: false, job });
};

export const findAllJobsByIdCompany = async (req: Request, res: Response, next: NextFunction) => {
	const allJobs = await Job.find({ company: req.params.idCompany }).populate([
		{ path: 'company', select: REMOVE_COMPANY_FIELDS },
		{ path: 'createdJob', select: REMOVE_USER_FIELDS }
	]);
	if (allJobs.length === 0) return next(new NotFoundError('Jobs not found'));
	res.status(200).json({ error: false, allJobs });
};

export const createJobByIDCompany = async (req: Request, res: Response, next: NextFunction) => {
	try {
		await jobRequestSchema.validate(req.body, { abortEarly: false });
		let idJob = crypto.randomBytes(3).toString('hex').toUpperCase();
		const findJob = await Job.findOne({ idJob });
		if (findJob) idJob = crypto.randomBytes(4).toString('hex').toUpperCase();

		const newJob = await Job.create({
			...req.body,
			idJob,
			company: req.params.idCompany,
			createdJob: req.user.userId
		});
		await Company.findByIdAndUpdate(req.params.idCompany, { $inc: { jobNumber: 1 } }, { new: true });
		res.status(201).json({ error: false, message: 'Job created successfully', job: newJob });
	} catch (error: any) {
		if (typeof 'MongoError') {
			return next(new ServerError(error.message));
		}
		if (error.name === 'ValidationError') {
			return errorHandlerYup(error, req, res, next);
		}
		res.send(error.message);
	}
};

/* Routes For Employee */
export const updateJobById = async (req: Request, res: Response, next: NextFunction) => {
	const job = await Job.findByIdAndUpdate(
		req.params.idJob,
		{
			$set: {
				...req.body,
				updatedAt: moment().format('YYYY-MM-DD HH:mm:ss')
			}
		},
		{ new: true }
	)
		.select(REMOVE_JOB_FIELDS)
		.populate([
			{ path: 'company', select: REMOVE_COMPANY_FIELDS },
			{ path: 'createdJob', select: REMOVE_USER_FIELDS }
		]);
	if (!job) return next(new NotFoundError('Job not found'));
	res.status(200).json({ error: false, message: 'Job updated successfully', job });
};

export const updateStatusJob = async (req: Request, res: Response, next: NextFunction) => {
	const { status } = req.body;
	if (!Object.values(EStatusJob).includes(status)) {
		return next(new BadRequestError('Invalid job status'));
	}
	const job = await Job.findByIdAndUpdate(
		req.params.idJob,
		{
			$set: { status }
		},
		{ new: true }
	)
		.select(REMOVE_JOB_FIELDS)
		.populate([
			{ path: 'company', select: REMOVE_COMPANY_FIELDS },
			{ path: 'createdJob', select: REMOVE_USER_FIELDS }
		]);
	if (!job) return next(new NotFoundError('Job not found'));
	res.status(200).json({ error: false, message: 'Status Job updated successfully', job });
};

export const findAllJobs = async (req: Request, res: Response, next: NextFunction) => {
	const allJobs = await Job.find().populate([
		{ path: 'company', select: REMOVE_COMPANY_FIELDS },
		{ path: 'createdJob', select: REMOVE_USER_FIELDS }
	]);
	if (!allJobs) return next(new NotFoundError('Jobs not found'));
	res.status(200).json({ error: false, allJobs });
};

/* Routes For Admin */
export const deleteById = async (req: Request, res: Response, next: NextFunction) => {
	const job = await Job.findByIdAndDelete(req.params.idJob).populate([
		{ path: 'company', select: REMOVE_COMPANY_FIELDS },
		{ path: 'createdJob', select: REMOVE_USER_FIELDS }
	]);
	await Company.findByIdAndUpdate(req.params.idCompany, { $inc: { jobNumber: -1 } }, { new: true });
	if (!job) return next(new NotFoundError('Job not found'));
	res.status(200).json({ error: false, message: 'Job deleted successfully' });
};
