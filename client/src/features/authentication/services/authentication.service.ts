import { api } from '@/utils/api';
import { getCookie } from '@/utils/cookies';

export async function login(formValue: object) {
	try {
		const response = await api.post('auth/login', formValue);
		return response.data;
	} catch (error: any) {
		return Promise.reject(error.response?.data?.message || error.message || 'Server Error');
	}
}

export async function isLogin() {
	try {
		const token = getCookie('ac-token');
		if (!token) await Promise.reject();
		const response = await api.post('auth/isLogin', { token });
		return response.data;
	} catch (error: any) {
		return Promise.reject(error.response?.data?.message || error.message || 'Server Error');
	}
}

export async function logout() {
	try {
		const token = getCookie('ac-token');
		if (!token) await Promise.reject();
		const response = await api.post(`auth/logout`, { token });
		return response.data;
	} catch (error: any) {
		return Promise.reject(error.response?.data?.message || error.message || 'Server Error');
	}
}

export async function forgotPassword(email: string) {
	try {
		const response = await api.post('auth/forgotPassword', { email });
		return response.data;
	} catch (error: any) {
		return Promise.reject(error.response?.data?.message || error.message || 'Server Error');
	}
}

export async function resetPassword(password: string) {
	try {
		const resetToken = await getCookie('reset-token');
		if (!resetToken) await Promise.reject();
		const response = await api.post(`auth/reset/${resetToken}`, { password });
		return response.data;
	} catch (error: any) {
		return Promise.reject(error.response?.data?.message || error.message || 'Server Error');
	}
}
