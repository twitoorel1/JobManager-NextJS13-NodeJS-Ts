import { Schema, model } from 'mongoose';
import { ICompany } from '../types/global';
import moment from 'moment';

const companySchema: Schema<ICompany> = new Schema({
	name: { type: String, required: true, unique: true },
	bnNumber: { type: String, required: true, unique: true },
	email: { type: String, required: true, unique: true },
	phone: { type: String, required: true, unique: true },
	address: { city: String, street: String, zipCode: Number },
	jobNumber: { type: Number, required: false, default: 0 },
	candidateNumber: { type: Number, required: false, default: 0 },
	employeeNumber: { type: Number, required: false, default: 0 },
	candidatesAssigned: [{ type: Schema.Types.ObjectId, ref: 'CandidateAssignment', default: [] }],
	createdAt: { type: String },
	updatedAt: { type: String }
});

companySchema.pre<ICompany>('save', async function (next) {
	if (!this.createdAt) this.createdAt = moment().format('YYYY-MM-DD HH:mm:ss');
	this.updatedAt = moment().format('YYYY-MM-DD HH:mm:ss');
	next();
});

companySchema.pre<ICompany>('findOneAndUpdate', function (next) {
	this.updatedAt = moment().format('YYYY-MM-DD HH:mm:ss');
	if (!this.createdAt) this.createdAt = moment().format('YYYY-MM-DD HH:mm:ss');
	next();
});

export default model<ICompany>('Company', companySchema);
