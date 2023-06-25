import { Schema, model, Types, Model } from 'mongoose';
import bcrypt from 'bcrypt';
import crypto from 'crypto';
import moment from 'moment';
import { emailRegex } from '../constants/regex.constant.js';
import { IUser, ERoles } from '../types/global.js';
// import path from "path";

const userSchema: Schema<IUser> = new Schema({
	email: {
		type: String,
		required: false,
		unique: true,
		match: [emailRegex, 'Invalid email address']
	},
	username: {
		type: String,
		required: false,
		unique: true
	},
	firstName: {
		type: String,
		required: false
	},
	lastName: {
		type: String,
		required: false
	},
	password: {
		type: String,
		required: false
	},
	phoneNumber: {
		type: String,
		required: false
	},
	role: {
		type: String,
		enum: Object.values(ERoles),
		default: ERoles.client,
		required: [false, 'Role Is Required']
	},
	// company: { type: Schema.Types.ObjectId, ref: 'Company' },
	imgSRC: {
		type: String,
		required: false
		// default: path.join(process.cwd() + "/public/default-profile.png"),
	},
	jwt_ac_token: {
		type: String,
		required: false
	},
	jwt_rf_token: {
		type: String,
		required: false
	},
	resetToken: {
		type: String,
		required: false
	},
	expireToken: {
		type: Date,
		required: false
	},
	createdAt: {
		type: String
	},
	updatedAt: {
		type: String
	},
	updatedPassword: {
		type: String
	},
	recentlyConnected: {
		type: String
	}
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

userSchema.methods.lastConnected = async function () {
	this.recentlyConnected = moment().format('YYYY-MM-DD HH:mm:ss');
};

userSchema.methods.comparePassword = async function (plainPassword: string) {
	const isMatch = await bcrypt.compare(plainPassword, this.password);
	return isMatch;
};

userSchema.methods.editPassword = async function (plainPassword: string) {
	this.password = plainPassword;
	this.updatedAt = moment().format('YYYY-MM-DD HH:mm:ss');
	this.updatedPassword = moment().format('YYYY-MM-DD HH:mm:ss');
	this.save();
};

userSchema.methods.forgotPassword = async function () {
	this.resetToken = await crypto.randomBytes(5).toString('hex');
	this.expireToken = Date.now() + 3600000;
	// this.expireToken = moment().format('YYYY-MM-DD HH:mm:ss') + 3600000;
	this.save();
	return this.resetToken;
};

userSchema.methods.resetPassword = async function (newPassword: string) {
	this.password = newPassword;
	this.resetToken = undefined;
	this.expireToken = undefined;
	this.save();
};

userSchema.methods.editImageProfile = async function (imgSRC: string) {
	this.imgSRC = imgSRC;
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

const User = model<IUser>('User', userSchema);
export default User;
