import type { MenuProps } from 'antd';
import { ThunkAction, ThunkDispatch } from 'redux-thunk';
import { AnyAction } from 'redux';
export type MenuItem = Required<MenuProps>['items'][number];

export interface AppState {
	// Properties related to the App state...
}

export interface RootState {
	app: AppState;
	auth: AuthState;
	user: UserState;
	// Other slices of your Redux state...
}

type LayoutProps = {
	children?: ReactNode;
	isAuthenticated?: any;
};

// Auth State
export interface AuthState {
  isAuthenticated: boolean | null;
  token?: string | null;
  isLoading: boolean;
  isRegister: boolean;
  isError: boolean | null;
  error: any;
  resetToken?: string | null;
  user?: {
    _id: string;
    firstName: string;
    lastName: string;
    phoneNumber?: number | undefined | string;
    email: string;
    username: string;
    role: string;
    imgSRC: string;
    company: {
      _id: string;
      name: string;
      bnNumber: number;
      website?: string;
      email?: string;
      phone?: string;
      logo?: string;
    };
  } | null;
}

export type FormRegisterInputs = {
	firstName: string;
	lastName: string;
	username: string;
	email: string;
	password: string;
	confirmPassword: string;
};

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

// User State
export interface UserState {
	isLoading: boolean;
	error: any;
	errorCode: string | number | null;
	isError: boolean | null;
	msg?: string | null;
	// user?: {
	// 	_id: string;
	// 	firstName: string;
	// 	lastName: string;
	// 	phoneNumber?: Number | undefined | string;
	// 	email: string;
	// 	username: string;
	// 	role: string;
	// 	imgSRC: string;
	//  company?: string[] | undefined;
	// 	updatedPassword?: Date | undefined | string;
	// 	recentlyConnected?: Date | undefined | string;
	// } | null;
	// allUsers?: Array<{
	// 	_id: string;
	// 	firstName: string;
	// 	lastName: string;
	// 	phoneNumber?: Number | undefined | string;
	// 	email: string;
	// 	username: string;
	// 	role: string;
	// 	imgSRC: string;
	//  company?: string[] | undefined;
	// 	updatedPassword?: Date | undefined | string;
	// 	recentlyConnected?: Date | undefined | string;
	// }> | null;
}

export interface EditProfileInputs {
	firstName?: string;
	lastName?: string;
	email?: string;
	username?: string;
}

export interface EditPasswordInputs {
	oldPassword?: string;
	newPassword?: string;
	confirmPassword?: string;
}
