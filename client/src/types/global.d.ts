export interface RootState {
	auth: AuthState;
	user: UserState;
	client: ClientState;
	candidate: CandidateState;
	job: JobState;
}

type LayoutProps = {
	children?: ReactNode;
	isAuthenticated?: any;
};

// Auth State
export interface AuthState {
	isLoading: boolean;
	isAuthenticated: boolean;
	isError: boolean;
	error: any;
	resetToken?: string | null;
	token?: string | null;
	isTokenChecked: boolean;
	isSending: boolean;
	user?: {
		_id: string;
		firstName: string;
		lastName: string;
		phoneNumber?: number | undefined | string;
		email: string;
		username: string;
		role: string;
		imgSRC: string;
	} | null;
}

export type FormLoginInputs = {
	username: string;
	password: string;
};

export type ForgotPasswordInputs = {
	email: string;
};

export type ResetPasswordInputs = {
	password: string;
};

//
// User State
export interface UserState {
	isLoading: boolean;
	isSending: boolean;
	message: string | null;
	isError: boolean;
	error: any;
}

export interface EditProfileInputs {
	firstName: string | undefined;
	lastName: string | undefined;
	email: string | undefined;
	username: string | undefined;
}

export interface EditPasswordInputs {
	oldPassword: string;
	newPassword: string;
	confirmPassword: string;
}

export interface EditImageProfileInputs {
	imgSRC: any;
}

export interface SendBugsInputs {
	subject: string;
	description: string;
}

// Client
export interface ClientState {
	isLoading: boolean;
	isSending: boolean;
	message: string | null;
	isError: boolean;
	error: any;
	client?: {
		_id: string;
		name: string;
		bnNumber?: string;
		email?: string;
		phone?: string;
		address?: {
			city: string;
			street: string;
			zipCode: string;
		};
	} | null;
	allClients?: Array<ClientState['client']>;
}

export interface CreateClientInputs {
	fullName: string;
	bnNumber: string;
	email: string;
	phone: string;
	city?: string;
	street?: string;
	zipCode?: string;
}

// Candidate
export interface CreateCandidateInputs {
	fullName: string;
	IdNumber: string;
	email?: string;
	phone: string;
	city: string;
	street: string;
	zipCode: string;
	age: string | number;
	gender: string;
}

// Job
export interface CreateJobInputs {
	title: string;
	category: string;
	type: string;
	description: string;
	salaryPrice: number | string;
	salaryType: string;
	branch: string;
	city: string;
	standards: string;
}
