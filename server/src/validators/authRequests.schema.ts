import * as yup from 'yup';
import { passwordRegex } from '../constants/regex.constant.js';

const loginRequestSchema = yup.object().shape({
	// email: yup.string().email().required(),
	username: yup.string().required('username is required'),
	password: yup.string().required('password is required').matches(passwordRegex)
});

const registerRequestSchema = yup.object().shape({
	email: yup.string().email().required('Email is required'),
	username: yup.string().required('username is required'),
	firstName: yup.string().required('firstName is required'),
	lastName: yup.string().required('lastName is required'),
	password: yup.string().required('password is required').matches(passwordRegex, 'Password not valid'),
	confirmPassword: yup.string().oneOf([yup.ref('password')], 'Passwords must match'),
	phoneNumber: yup.string().required('phone number is required')
});

const editPasswordRequestSchema = yup.object().shape({
	oldPassword: yup.string().required('old password is required'),
	newPassword: yup.string().required('new password is required').matches(passwordRegex, 'Password not valid'),
	confirmPassword: yup.string().oneOf([yup.ref('newPassword')], 'Passwords must match')
});

export { registerRequestSchema, loginRequestSchema, editPasswordRequestSchema };
