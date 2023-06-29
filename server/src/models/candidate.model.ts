import { Schema, model } from 'mongoose';
import { ICandidate } from '../types/global';
import moment from 'moment';

const candidateSchema: Schema<ICandidate> = new Schema({
	idCandidate: { type: String, required: true, unique: true },
	fullName: { type: String, required: true },
	IdNumber: { type: Number, required: true, unique: true },
	email: { type: String, unique: true },
	phone: { type: String, required: true, unique: true },
	createdCandidate: { type: Schema.Types.ObjectId, ref: 'User', required: false },
	address: { city: String, street: String, zipCode: Number },
	age: { type: Number, required: true, min: 1, max: 120 },
	gender: { type: String, required: true },
	isAssigned: { type: Boolean, default: false },
	companyAssigned: [{ type: Schema.Types.ObjectId, ref: 'Company', required: false, default: [] }],
	createdAt: { type: String },
	updatedAt: { type: String }
});

candidateSchema.pre<ICandidate>('save', async function (next) {
	if (!this.createdAt) this.createdAt = moment().format('YYYY-MM-DD HH:mm:ss');
	this.updatedAt = moment().format('YYYY-MM-DD HH:mm:ss');
	next();
});

candidateSchema.pre<ICandidate>('findOneAndUpdate', function (next) {
	this.updatedAt = moment().format('YYYY-MM-DD HH:mm:ss');
	if (!this.createdAt) this.createdAt = moment().format('YYYY-MM-DD HH:mm:ss');
	next();
});

export default model<ICandidate>('Candidate', candidateSchema);
