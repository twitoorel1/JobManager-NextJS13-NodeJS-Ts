import { Request } from 'express';
import { Secret } from 'jsonwebtoken';
import { Schema, Types } from 'mongoose';

export enum ERoles {
	admin = 'admin',
	employee = 'employee',
	client = 'client'
}
export interface IUser extends Document {
	_id: string;
	email: string;
	username: string;
	firstName: string;
	lastName: string;
	password: string;
	phoneNumber?: number;
	role: string;
	// company: Schema.Types.ObjectId[] | Schema.Types.ObjectId | any;
	imgSRC?: string;
	resetToken?: string;
	expireToken?: number | string;
	jwt_ac_token?: Secret;
	jwt_rf_token?: Secret;
	createdAt: Date | number | string | any;
	updatedAt?: Date | number | string | any;
	updatedPassword?: Date | number | string | any;
	recentlyConnected?: Date | number | string | any;
	comparePassword: Function;
	lastConnected: Function;
	editPassword: Function;
	forgotPassword: Function;
	resetPassword: Function;
	editImageProfile: Function;
	setJwtTokens: Function;
	deleteAcToken: Function;
	isModified: Function;
}

export interface ICompany extends Document {
	_id: string;
	name: string;
	bnNumber?: number;
	website?: string;
	email?: string;
	phone?: string;
	address: Object;
	logo?: string;
	// statistics?: Array<Object> | Array<any>;
	createdAt: Date | number | string | any;
	updatedAt?: Date | number | string | any;
}

export interface IJob extends Document {
	_id: string;
	idJob: any;
	title: string;
	category: string;
	type: string;
	description: string;
	createdAt: Date | number | string | any;
	createdJob: Schema.Types.ObjectId;
	company: Schema.Types.ObjectId;
	salaryPrice: number;
	salaryType: string;
	branch: string;
	address: string;
	standards: number;
}

export interface IRequestUserId extends Request {
	user?: string | object | null | undefined;
}

declare module 'express' {
	interface Request {
		// user?: string | object | null | undefined | any;
		user?: IUser | null | undefined | any;
	}
}
