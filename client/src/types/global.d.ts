export interface RootState {
	auth: AuthState;
	user: UserState;
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
