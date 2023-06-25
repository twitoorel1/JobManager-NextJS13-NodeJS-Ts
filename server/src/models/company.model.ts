import { Schema, model } from 'mongoose';
import { ICompany } from 'types/global.js';
import moment from 'moment';

const companySchema: Schema<ICompany> = new Schema({
	name: {
		type: String,
		required: false,
		unique: true
	},
	bnNumber: {
		type: Number,
		required: false
	},
	website: {
		type: String,
		required: false
	},
	email: {
		type: String,
		required: false
	},
	phone: {
		type: String,
		required: false
	},
	address: { city: String, street: String, zipCode: Number },
	logo: {
		type: String,
		required: false
	},
	// statistics: [
	// 	{
	// 		jobsCreated: {
	// 			type: String,
	// 			required: false
	// 		},
	// 		successfulInterview: {
	// 			type: String,
	// 			required: false
	// 		},
	// 		unsuccessfulInterview: {
	// 			type: String,
	// 			required: false
	// 		}
	// 	}
	// ],
	createdAt: {
		type: String
	},
	updatedAt: {
		type: String
	}
});

companySchema.pre<ICompany>('save', async function (next) {
	if (!this.createdAt) {
		this.createdAt = moment().format('YYYY-MM-DD HH:mm:ss');
	}
	this.updatedAt = moment().format('YYYY-MM-DD HH:mm:ss');
	next();
});

companySchema.pre<ICompany>('findOneAndUpdate', function (next) {
	this.updatedAt = moment().format('YYYY-MM-DD HH:mm:ss');
	if (!this.createdAt) {
		this.createdAt = moment().format('YYYY-MM-DD HH:mm:ss');
	}
	next();
});

const Company = model<ICompany>('Company', companySchema);
export default Company;
