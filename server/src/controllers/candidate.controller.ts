import { NextFunction, Request, Response } from 'express';
import Candidate from '../models/candidate.model';
import CandidateAssignment from '../models/candidateAssignment.model';
import Company from '../models/company.model';
import Job from '../models/job.model';
import moment from 'moment';
import crypto from 'crypto';
import { BadRequestError, NotFoundError, ServerError, UnauthorizeError } from '../errors/Errors';
import errorHandlerYup from '../errors/errorHandlerYup';
import { candidateRequestsSchema } from '../validators/candidateRequests.schema';
import { REMOVE_CANDIDATE_FIELDS, REMOVE_USER_FIELDS, REMOVE_COMPANY_FIELDS } from '../constants/user.constants';
import { EStatusCandidate } from '../types/global';

// Candidate Assignments
export const findAllCandidatesAssignmentsByIdCompany = async (req: Request, res: Response, next: NextFunction) => {
	const allCandidateAssignmentFind = await CandidateAssignment.find({ company: req.params.idCompany })
		.select(REMOVE_CANDIDATE_FIELDS)
		.populate([
			{ path: 'candidate', select: REMOVE_CANDIDATE_FIELDS, populate: { path: 'createdCandidate', select: REMOVE_USER_FIELDS } },
			{ path: 'company', select: REMOVE_COMPANY_FIELDS },
			{ path: 'job', select: REMOVE_CANDIDATE_FIELDS, populate: { path: 'createdJob', select: REMOVE_USER_FIELDS } }
		]);
	if (allCandidateAssignmentFind.length === 0) return next(new NotFoundError('Candidate Assignment Not Found'));
	res.status(200).json({ error: false, candidate: allCandidateAssignmentFind });
};

export const findCandidateAssignmentByIdAndIdCompany = async (req: Request, res: Response, next: NextFunction) => {
	const CandidateAssignmentFind = await CandidateAssignment.findOne({
		$and: [{ company: req.params.idCompany }, { candidate: req.params.idCandidate }]
	})
		.select(REMOVE_CANDIDATE_FIELDS)
		.populate([
			{ path: 'candidate', select: REMOVE_CANDIDATE_FIELDS, populate: { path: 'createdCandidate', select: REMOVE_USER_FIELDS } },
			{ path: 'company', select: REMOVE_COMPANY_FIELDS },
			{ path: 'job', select: REMOVE_CANDIDATE_FIELDS, populate: { path: 'createdJob', select: REMOVE_USER_FIELDS } }
		]);
	if (!CandidateAssignmentFind) return next(new NotFoundError('Candidate Assignment Not Found'));
	res.status(200).json({ error: false, candidate: CandidateAssignmentFind });
};

export const updateStatusCandidateAssignmentByIdAndIdCompany = async (req: Request, res: Response, next: NextFunction) => {
	const CandidateAssignmentFind = await CandidateAssignment.findOne({
		$and: [{ company: req.params.idCompany }, { candidate: req.params.idCandidate }]
	}).select(REMOVE_CANDIDATE_FIELDS);
	if (!CandidateAssignmentFind) return next(new NotFoundError('Candidate Assignment Not Found'));

	if (!Object.values(EStatusCandidate).includes(req.body.status)) {
		return next(new BadRequestError('Invalid Status Candidate'));
	}

	const updateCandidateAssignment = await CandidateAssignment.findByIdAndUpdate(
		CandidateAssignmentFind._id,
		{
			$set: {
				status: req.body.status,
				updatedAt: moment().format('YYYY-MM-DD HH:mm:ss')
			}
		},
		{ new: true }
	)
		.select(REMOVE_CANDIDATE_FIELDS)
		.populate([
			{ path: 'candidate', select: REMOVE_CANDIDATE_FIELDS, populate: { path: 'createdCandidate', select: REMOVE_USER_FIELDS } },
			{ path: 'company', select: REMOVE_COMPANY_FIELDS }
		]);

	res.status(200).json({ error: false, candidate: updateCandidateAssignment, status: updateCandidateAssignment?.status });
};

export const deleteCandidateAssignmentByIdAndIdCompany = async (req: Request, res: Response, next: NextFunction) => {
	const CandidateAssignmentFind = await CandidateAssignment.findOne({
		$and: [{ company: req.params.idCompany }, { candidate: req.params.idCandidate }]
	}).select(REMOVE_CANDIDATE_FIELDS);
	if (!CandidateAssignmentFind) return next(new NotFoundError('Candidate Assignment Not Found'));
	await CandidateAssignment.findByIdAndDelete(CandidateAssignmentFind._id);
	await Candidate.findByIdAndUpdate(req.params.idCandidate, { $pull: { companyAssigned: req.params.idCompany } }, { new: true });
	await Company.findByIdAndUpdate(req.params.idCompany, { $pull: { candidatesAssigned: req.params.idCandidate }, $inc: { candidateNumber: -1 } }, { new: true });
	await Job.findByIdAndUpdate(req.params.idJob, { $pull: { candidatesAssigned: req.params.idCandidate } }, { new: true });
	res.status(200).json({ error: false, message: 'Candidate Assignment deleted successfully' });
};

/* Routes For Employee */
export const findById = async (req: Request, res: Response, next: NextFunction) => {
	const candidateFind = await Candidate.findById(req.params.idCandidate).select(REMOVE_CANDIDATE_FIELDS).populate({ path: 'createdCandidate', select: REMOVE_USER_FIELDS });
	if (!candidateFind) return next(new NotFoundError('Candidate not found'));
	res.status(200).json({ error: false, candidate: candidateFind });
};

export const findAllCandidates = async (req: Request, res: Response, next: NextFunction) => {
	const allCandidateFind = await Candidate.find().select(REMOVE_CANDIDATE_FIELDS).populate({ path: 'createdCandidate', select: REMOVE_USER_FIELDS });
	if (!allCandidateFind) return next(new NotFoundError('candidates not found'));
	res.status(200).json({ error: false, candidates: allCandidateFind });
};

export const createCandidate = async (req: Request, res: Response, next: NextFunction) => {
	try {
		await candidateRequestsSchema.validate(req.body, { abortEarly: false });
		let idCandidate = crypto.randomBytes(3).toString('hex').toUpperCase();
		const findCandidate = await Candidate.findOne({ idCandidate });
		if (findCandidate) idCandidate = crypto.randomBytes(4).toString('hex').toUpperCase();

		const newCandidate = await Candidate.create({
			...req.body,
			idCandidate,
			createdCandidate: req.body.createdCandidate
		});
		res.status(201).json({ error: false, message: 'Candidate created successfully', candidate: newCandidate });
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

export const updateCandidateById = async (req: Request, res: Response, next: NextFunction) => {
	const candidate = await Candidate.findByIdAndUpdate(
		req.params.idCandidate,
		{
			$set: {
				...req.body,
				updatedAt: moment().format('YYYY-MM-DD HH:mm:ss')
			}
		},
		{ new: true }
	)
		.select(REMOVE_CANDIDATE_FIELDS)
		.populate({ path: 'createdCandidate', select: REMOVE_USER_FIELDS });
	if (!candidate) return next(new NotFoundError('Candidate not found'));
	res.status(200).json({ error: false, message: 'Candidate updated successfully', candidate });
};

export const updateAssignedCandidate = async (req: Request, res: Response, next: NextFunction) => {
	const candidateFind = await Candidate.findById(req.params.idCandidate)
		.select(REMOVE_CANDIDATE_FIELDS)
		.populate([
			{ path: 'createdCandidate', select: REMOVE_USER_FIELDS },
			{ path: 'companyAssigned', select: REMOVE_COMPANY_FIELDS }
		]);
	if (!candidateFind) return next(new NotFoundError('Candidate not found'));
	const companyExist = candidateFind.companyAssigned.toString();
	if (companyExist.includes(req.params.idCompany)) return next(new UnauthorizeError('Candidate Exist At This Company'));

	const company = await Company.findById(req.params.idCompany).select(REMOVE_COMPANY_FIELDS);
	if (company?.name === 'Boeing HRM') return next(new UnauthorizeError('There is no access to the Boeing company to assign a position'));

	const candidate = await Candidate.findByIdAndUpdate(
		req.params.idCandidate,
		{
			$push: { companyAssigned: req.params.idCompany },
			$set: {
				isAssigned: true,
				updatedAt: moment().format('YYYY-MM-DD HH:mm:ss')
			}
		},
		{ new: true }
	)
		.select(REMOVE_CANDIDATE_FIELDS)
		.populate({ path: 'createdCandidate', select: REMOVE_USER_FIELDS });
	if (!candidate) return next(new NotFoundError('Candidate not found'));
	await CandidateAssignment.create({
		candidate: req.params.idCandidate,
		company: req.params.idCompany,
		job: req.params.idJob,
		status: EStatusCandidate.sendedToInterview
	});
	await Company.findByIdAndUpdate(req.params.idCompany, { $push: { candidatesAssigned: req.params.idCandidate }, $inc: { candidateNumber: 1 } }, { new: true });
	await Job.findByIdAndUpdate(req.params.idJob, { $push: { candidatesAssigned: req.params.idCandidate } }, { new: true });
	res.status(200).json({ error: false, message: 'Candidate Company Assigned updated successfully', candidate });
};

/* Routes For Admin */
export const deleteCandidate = async (req: Request, res: Response, next: NextFunction) => {
	const candidate = await Candidate.findByIdAndDelete(req.params.idCandidate).populate({ path: 'createdCandidate', select: REMOVE_USER_FIELDS });
	if (!candidate) return next(new NotFoundError('Candidate not found'));
	res.status(200).json({ error: false, message: 'Candidate deleted successfully' });
};
