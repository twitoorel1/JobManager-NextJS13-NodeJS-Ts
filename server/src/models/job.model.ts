import { Schema, model } from 'mongoose';
import { IJob, EStatusJob } from '../types/global';
import moment from 'moment';

const jobSchema: Schema<IJob> = new Schema({
	idJob: { type: String, required: true, unique: true },
	title: { type: String, required: true },
	category: { type: String, required: true },
	type: { type: String, required: true },
	description: { type: String, required: true },
	company: { type: Schema.Types.ObjectId, ref: 'Company', required: false },
	createdJob: { type: Schema.Types.ObjectId, ref: 'User', required: false },
	salaryPrice: { type: Number, required: true },
	salaryType: { type: String, required: true },
	branch: { type: String, required: false },
	city: { type: String, required: false },
	standards: { type: Number, required: true },
	status: {
		type: String,
		validate: {
			validator: function (value: string) {
				return Object.values(EStatusJob).includes(value as EStatusJob);
			},
			message: 'Invalid job status'
		},
		default: EStatusJob.pendingApproval
	},
	createdAt: { type: String },
	updatedAt: { type: String }
});

jobSchema.pre<IJob>('save', async function (next) {
	if (!this.createdAt) this.createdAt = moment().format('YYYY-MM-DD HH:mm:ss');
	this.updatedAt = moment().format('YYYY-MM-DD HH:mm:ss');
	next();
});

jobSchema.pre<IJob>('findOneAndUpdate', function (next) {
	this.updatedAt = moment().format('YYYY-MM-DD HH:mm:ss');
	if (!this.createdAt) this.createdAt = moment().format('YYYY-MM-DD HH:mm:ss');
	next();
});

export default model<IJob>('Job', jobSchema);
