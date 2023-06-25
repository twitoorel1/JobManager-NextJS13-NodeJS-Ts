import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { FormLoginInputs, AuthState } from '@/types/global';
import { setCookie, removeCookie } from '@/utils/cookies';
import { isLogin, login, logout, forgotPassword, resetPassword } from '../services/authentication.service';

export const loginByPayload = createAsyncThunk('authentication/loginByPayload', async (values: FormLoginInputs) => {
	const data = await login(values);
	return data;
});

export const isLoginByToken = createAsyncThunk('authentication/isLoginByToken', async () => {
	const data = await isLogin();
	return data;
});

export const logoutByToken = createAsyncThunk('auth/logoutByToken', async (values: any) => {
	const data = await logout(values);
	return data;
});

export const forgotPasswordByEmail = createAsyncThunk('authentication/forgotPasswordByEmail', async (email: string) => {
	const data = await forgotPassword(email);
	return data;
});

export const resetPasswordByResetToken = createAsyncThunk('authentication/resetPasswordByResetToken', async (password: string) => {
	const data = await resetPassword(password);
	return data;
});

const initialState: AuthState = {
	isLoading: false,
	isAuthenticated: false,
	isError: false,
	error: null,
	resetToken: null,
	token: null,
	isTokenChecked: false,
	isSending: false,
	user: null
};

export const authSlice = createSlice({
	name: 'auth',
	initialState,
	reducers: {},
	extraReducers: builder => {
		builder
			// Handle Login
			.addCase(loginByPayload.pending, state => {
				state.isLoading = true;
				state.isError = false;
				state.error = '';
			})
			.addCase(loginByPayload.fulfilled, (state, { payload }: any) => {
				state.isLoading = false;
				state.isAuthenticated = true;
				state.isError = false;
				state.error = null;
				state.token = payload.token;
				state.isSending = true;
				state.user = payload.data;
				setCookie('ac-token', payload.token);
				setCookie('userId', payload.data._id);
			})

			// Handle isLogin?
			.addCase(isLoginByToken.pending, state => {
				// state.isLoading = true;
				state.isError = false;
				state.error = '';
			})
			.addCase(isLoginByToken.fulfilled, (state, { payload }: any) => {
				state.isLoading = false;
				state.isAuthenticated = true;
				state.isError = false;
				state.error = null;
				state.isTokenChecked = true;
				state.user = payload.user;
			})

			// Handle logout?
			.addCase(logoutByToken.pending, state => {
				state.isLoading = true;
				state.isError = false;
				state.error = '';
			})
			.addCase(logoutByToken.fulfilled, (state, { payload }: any) => {
				state.isLoading = false;
				state.isAuthenticated = false;
				state.isError = false;
				state.error = null;
				state.token = null;
				state.isTokenChecked = false;
				state.user = null;
				removeCookie('ac-token', { path: '/' });
				removeCookie('userId', { path: '/' });
			})

			// Handle Forgot Password?
			.addCase(forgotPasswordByEmail.pending, state => {
				state.isLoading = true;
				state.isError = false;
				state.error = '';
			})
			.addCase(forgotPasswordByEmail.fulfilled, (state, { payload }: any) => {
				state.isLoading = false;
				state.isAuthenticated = false;
				state.isError = false;
				state.error = null;
				state.token = null;
				state.isTokenChecked = false;
				state.isSending = true;
				state.user = null;
				state.resetToken = payload.resetToken;
				setCookie('reset-token', payload.resetToken);
			})

			// Handle Reset Password By Reset Token?
			.addCase(resetPasswordByResetToken.pending, state => {
				state.isLoading = true;
				state.isError = false;
				state.error = '';
			})
			.addCase(resetPasswordByResetToken.fulfilled, (state, { payload }: any) => {
				state.isLoading = false;
				state.isAuthenticated = false;
				state.isError = false;
				state.error = null;
				state.token = null;
				state.isTokenChecked = false;
				state.isSending = true;
				state.user = null;
				state.resetToken = null;
				removeCookie('reset-token', { path: '/' });
			})

			// Handle All Rejected
			.addMatcher(
				action => action.type.endsWith('/rejected'),
				(state, action) => {
					state.isLoading = false;
					state.isAuthenticated = false;
					state.isError = true;
					state.error = action.error.message;
					state.resetToken = null;
					state.token = null;
					state.isTokenChecked = false;
					state.user = null;
				}
			);
	}
});

export default authSlice.reducer;
