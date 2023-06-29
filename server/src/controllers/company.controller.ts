import { NextFunction, Request, Response } from 'express';
import Company from '../models/company.model';
import moment from 'moment';
import { NotFoundError, ServerError, UnauthorizeError } from '../errors/Errors';
import { REMOVE_COMPANY_FIELDS } from '../constants/user.constants';
import errorHandlerYup from '../errors/errorHandlerYup';

/* Routes For employee And Admin */
export const findById = async (req: Request, res: Response, next: NextFunction) => {
	const companyFind = await Company.findById(req.params.companyId).select(REMOVE_COMPANY_FIELDS);
	if (!companyFind) return next(new NotFoundError('Company not found'));
	res.status(200).json({ error: false, company: companyFind });
};

export const findAllCompanies = async (req: Request, res: Response, next: NextFunction) => {
	const companies = await Company.find().select(REMOVE_COMPANY_FIELDS);
	if (companies.length === 0) return next(new NotFoundError('Company not found'));
	res.status(200).json({ error: false, allCompanies: companies });
};

export const updateCompanyById = async (req: Request, res: Response, next: NextFunction) => {
	const company = await Company.findByIdAndUpdate(
		req.params.companyId,
		{
			$set: {
				...req.body,
				updatedAt: moment().format('YYYY-MM-DD HH:mm:ss')
			}
		},
		{ new: true }
	).select(REMOVE_COMPANY_FIELDS);
	if (!company) return next(new NotFoundError('Company not found'));
	res.status(200).json({ error: false, message: 'Company updated successfully', company });
};

/* Routes For Admin */
export const createCompany = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const company = await Company.findOne({ bnNumber: req.body.bnNumber }).select(REMOVE_COMPANY_FIELDS);
		if (company) return next(new UnauthorizeError('Company Already Exists'));
		const newCompany = await Company.create(req.body);
		res.status(201).json({ error: false, message: 'Company created successfully', company: newCompany });
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

export const deleteCompanyById = async (req: Request, res: Response, next: NextFunction) => {
	const companyDelete = await Company.findByIdAndDelete(req.params.companyId).select(REMOVE_COMPANY_FIELDS);
	if (!companyDelete) return next(new NotFoundError('Company not found'));
	res.status(200).json({ error: false, message: 'Company deleted successfully' });
};
