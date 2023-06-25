import { Schema, model, Types } from 'mongoose';
import { IJob } from 'types/global.js';
import { v4 as uuidv4 } from 'uuid';
import moment from 'moment';

const jobSchema: Schema<IJob> = new Schema({
	idJob: {
		type: Number,
		default: uuidv4()
	},
	title: {
		type: String,
		required: true
	},
	category: {
		type: String,
		required: false
	},
	type: {
		type: String,
		required: false
	},
	description: {
		type: String
	},
	createdAt: {
		type: String
	},
	createdJob: {
		type: Types.ObjectId,
		ref: 'User',
		required: true,
		autopopulate: true
	},
	company: {
		type: Types.ObjectId,
		ref: 'Company',
		required: true,
		autopopulate: true
	},
	salaryPrice: {
		type: Number,
		required: false
	},
	salaryType: {
		type: String,
		required: false
	},
	branch: {
		type: String,
		required: false
	},
	address: {
		type: String,
		required: false
	},
	standards: {
		type: Number,
		required: false
	}
});

jobSchema.pre<IJob>('save', async function (next) {
	if (!this.createdAt) {
		this.createdAt = moment().format('YYYY-MM-DD HH:mm:ss');
	}
	next();
});

jobSchema.pre<IJob>('findOneAndUpdate', function (next) {
	if (!this.createdAt) {
		this.createdAt = moment().format('YYYY-MM-DD HH:mm:ss');
	}
	next();
});

jobSchema.plugin(require('mongoose-autopopulate'));

const Job = model<IJob>('Job', jobSchema);
export default Job;
