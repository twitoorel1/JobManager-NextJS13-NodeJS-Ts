import { Schema, model } from 'mongoose';
import { ICandidateAssignment, EStatusCandidate } from '../types/global';
import moment from 'moment';

const candidateAssignmentSchema: Schema<ICandidateAssignment> = new Schema({
	candidate: { type: Schema.Types.ObjectId, ref: 'Candidate', required: false },
	company: { type: Schema.Types.ObjectId, ref: 'Company', required: false },
	job: { type: Schema.Types.ObjectId, ref: 'Job', required: false },
	status: {
		type: String,
		validate: {
			validator: function (value: string) {
				return Object.values(EStatusCandidate).includes(value as EStatusCandidate);
			},
			message: 'Invalid candidate status'
		},
		default: EStatusCandidate.open
	},
	createdAt: { type: String },
	updatedAt: { type: String }
});

candidateAssignmentSchema.pre<ICandidateAssignment>('save', async function (next) {
	if (!this.createdAt) this.createdAt = moment().format('YYYY-MM-DD HH:mm:ss');
	this.updatedAt = moment().format('YYYY-MM-DD HH:mm:ss');
	next();
});

candidateAssignmentSchema.pre<ICandidateAssignment>('findOneAndUpdate', function (next) {
	this.updatedAt = moment().format('YYYY-MM-DD HH:mm:ss');
	if (!this.createdAt) this.createdAt = moment().format('YYYY-MM-DD HH:mm:ss');
	next();
});

export default model<ICandidateAssignment>('CandidateAssignment', candidateAssignmentSchema);
