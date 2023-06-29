import * as yup from 'yup';
import { passwordRegex } from '../constants/regex.constant';

const loginRequestSchema = yup.object().shape({
	// email: yup.string().email().required(),
	username: yup.string().required('username is required'),
	password: yup.string().required('password is required').matches(passwordRegex)
});

const registerRequestSchema = yup.object().shape({
	firstName: yup.string().required('firstName is required'),
	lastName: yup.string().required('lastName is required'),
	username: yup.string().required('username is required'),
	email: yup.string().email().required('Email is required'),
	password: yup.string().required('password is required').matches(passwordRegex, 'Password not valid'),
	confirmPassword: yup
		.string()
		.required('Confirm Password is required')
		.oneOf([yup.ref('password')], 'Passwords must match')
});

const editPasswordRequestSchema = yup.object().shape({
	oldPassword: yup.string().required('old password is required'),
	newPassword: yup.string().required('new password is required').matches(passwordRegex, 'Password not valid'),
	confirmPassword: yup.string().oneOf([yup.ref('newPassword')], 'Passwords must match')
});

const resetPasswordRequestSchema = yup.object().shape({
	password: yup.string().required('password is required').matches(passwordRegex, 'Password not valid')
});

export { registerRequestSchema, loginRequestSchema, editPasswordRequestSchema, resetPasswordRequestSchema };
