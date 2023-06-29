import { Schema, model } from 'mongoose';
import bcrypt from 'bcrypt';
import crypto from 'crypto';
import moment from 'moment';
import { emailRegex } from '../constants/regex.constant';
import { IUser, ERoles } from '../types/global';

const userSchema: Schema<IUser> = new Schema({
	firstName: { type: String, required: true },
	lastName: { type: String, required: true },
	username: { type: String, required: true, unique: true },
	email: { type: String, required: true, unique: true, match: [emailRegex, 'Invalid email address'] },
	password: { type: String, required: true },
	// role: { type: String, enum: Object.values(ERoles), default: ERoles.client },
	role: {
		type: String,
		validate: {
			validator: function (value: string) {
				return Object.values(ERoles).includes(value as ERoles);
			},
			message: 'Invalid job status'
		},
		default: ERoles.client
	},
	company: { type: Schema.Types.ObjectId, ref: 'Company', default: process.env.ID_COMPANY_BOEING },
	imgSrc: { type: String },
	// Statistic
	jwt_ac_token: { type: String },
	jwt_rf_token: { type: String },
	resetToken: { type: String },
	expireToken: { type: String },
	updatedPassword: { type: String },
	passwordHistory: [{ type: String }],
	recentlyConnected: { type: String },
	createdAt: { type: String },
	updatedAt: { type: String }
});

userSchema.pre<IUser>('save', async function (next) {
	if (!this.isModified('password')) return next();
	this.password = await bcrypt.hash(this.password, 10);
	if (!this.createdAt) {
		this.createdAt = moment().format('YYYY-MM-DD HH:mm:ss');
	}
	this.updatedAt = moment().format('YYYY-MM-DD HH:mm:ss');
	next();
});

userSchema.pre<IUser>('findOneAndUpdate', function (next) {
	this.updatedAt = moment().format('YYYY-MM-DD HH:mm:ss');
	if (!this.createdAt) {
		this.createdAt = moment().format('YYYY-MM-DD HH:mm:ss');
	}
	next();
});

userSchema.methods.comparePassword = async function (plainPassword: string) {
	return await bcrypt.compare(plainPassword, this.password);
};

userSchema.methods.lastConnected = async function () {
	this.recentlyConnected = moment().format('YYYY-MM-DD HH:mm:ss');
};

userSchema.methods.editPassword = async function (plainPassword: string) {
	this.password = plainPassword;
	this.updatedAt = moment().format('YYYY-MM-DD HH:mm:ss');
	this.updatedPassword = moment().format('YYYY-MM-DD HH:mm:ss');
	this.save();
};

userSchema.methods.forgotPassword = async function () {
	this.resetToken = crypto.randomBytes(5).toString('hex');
	this.expireToken = Date.now() + 3600000;
	this.save();
	return this.resetToken;
};

userSchema.methods.resetPassword = async function (newPassword: string) {
	// if (this.passwordHistory.includes(newPassword)) {
	// 	throw new Error('You have used this password before');
	// }
	// this.passwordHistory.push(await bcrypt.hash(newPassword, 10));
	// this.passwordHistory.push(newPassword);
	this.password = newPassword;
	this.resetToken = undefined;
	this.expireToken = undefined;
	this.save();
};

userSchema.methods.editImageProfile = async function (imgSrc: string) {
	this.imgSrc = imgSrc;
	this.updatedAt = moment().format('YYYY-MM-DD HH:mm:ss');
	this.save();
};

userSchema.methods.setJwtTokens = function (accessToken: string, refreshToken: string) {
	this.jwt_ac_token = accessToken;
	this.jwt_rf_token = refreshToken;
	this.save();
};

userSchema.methods.deleteAcToken = function () {
	this.jwt_ac_token = null;
	this.save();
};

export default model<IUser>('User', userSchema);
