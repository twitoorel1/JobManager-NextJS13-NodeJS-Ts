import { Secret } from 'jsonwebtoken';
import { Schema, Document, ObjectId, Types } from 'mongoose';

export enum ERoles {
	admin = 'admin',
	employee = 'employee',
	client = 'client'
}

export enum EStatusJob {
	pendingApproval = 'Pending Approval', // default
	open = 'Open',
	onHold = 'On Hold',
	cancelled = 'Cancelled',
	filled = 'Filled',
	closed = 'Closed'
}

export enum EStatusCandidate {
	open = 'open', // default
	sendedToInterview = 'Sended To Interview',
	failedInterview = 'Failed Interview',
	working = 'Working',
	isAssignedToCompany = 'Assigned To Company'
}

// Define a mapped type that updates the type of 'company' to 'Schema.Types.ObjectId'
type ObjectIdCompany<T> = T extends { company: any } ? { company: Schema.Types.ObjectId } : T;

export interface IUser extends ObjectIdCompany<Document> {
	_id: string;
	firstName: string;
	lastName: string;
	username: string;
	email: string;
	password: string;
	role: ERoles;
	company: Types.ObjectId | ICompany;
	imgSrc: string;

	// Statistic
	jwt_ac_token?: Secret;
	jwt_rf_token?: Secret;
	resetToken?: string;
	expireToken?: number | string;
	updatedPassword?: Date | number | string | any;
	passwordHistory?: Array<string>;
	recentlyConnected?: Date | number | string | any;
	createdAt: Date | number | string | any;
	updatedAt?: Date | number | string | any;

	// Functions
	isModified(path?: string | string[] | undefined): boolean;
	comparePassword(password: string): boolean;
	lastConnected(): void;
	editPassword(plainPassword: string): void;
	forgotPassword(): void;
	resetPassword(newPassword: string): void;
	editImageProfile(imgSrc: string): void;
	setJwtTokens(accessToken: string, refreshToken: string): void;
	deleteAcToken(): void;
}

export interface ICompany extends Document {
	_id: string | ObjectId;
	name: string;
	bnNumber?: string;
	email?: string;
	phone?: string;
	address: Object;
	jobNumber?: number;
	candidateNumber?: number;
	employeeNumber?: number;
	candidatesAssigned?: Types.ObjectId[];
	createdAt: Date | number | string | any;
	updatedAt?: Date | number | string | any;
}

export interface IJob extends Document {
	_id: string | ObjectId;
	idJob: any;
	title: string;
	category: string;
	type: string;
	description: string;
	company: Types.ObjectId | ICompany;
	createdJob: Schema.Types.ObjectId;
	salaryPrice: number;
	salaryType: string;
	branch: string;
	city: string;
	standards: number;
	status: EStatusJob;
	candidatesAssigned?: Types.ObjectId[];
	createdAt: Date | number | string | any;
	updatedAt?: Date | number | string | any;
}

export interface ICandidate extends Document {
	_id: string | ObjectId;
	idCandidate: any;
	fullName: string;
	IdNumber: string | number;
	email?: string;
	phone: string;
	createdCandidate: Types.ObjectId | IUser;
	address: Object;
	age: number;
	gender: string;
	isAssigned: boolean;
	companyAssigned: Types.ObjectId[] | ICompany[];
	createdAt: Date | number | string | any;
	updatedAt?: Date | number | string | any;
}

export interface ICandidateAssignment extends Document {
	candidate: Types.ObjectId | ICandidate;
	company: Types.ObjectId | ICompany;
	job: Types.ObjectId | IJob;
	status: EStatusCandidate;
	createdAt: Date | number | string | any;
	updatedAt?: Date | number | string | any;
}

declare module 'express' {
	interface Request {
		user?: IUser | string | object | null | undefined | any;
		company?: ICompany | string | object | null | undefined | any;
		job?: IJob | string | object | null | undefined | any;
		ICandidate?: ICandidate | string | object | null | undefined | any;
	}
}
