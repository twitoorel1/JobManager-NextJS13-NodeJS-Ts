import { api } from '@/utils/api';
import { getCookie } from '@/utils/cookies';

export async function editPassword(formValue: object) {
	try {
		const userId = await getCookie('userId');
		if (!userId) await Promise.reject();
		const response = await api.put(`/user/editPassword/${userId}`, formValue);
		return response.data;
	} catch (error: any) {
		return Promise.reject(error.response?.data?.message || error.message || 'Server Error');
	}
}

export async function updateUser(formValue: object) {
	try {
		const userId = await getCookie('userId');
		if (!userId) await Promise.reject();
		const response = await api.put(`/user/update/${userId}`, formValue);
		return response.data;
	} catch (error: any) {
		return Promise.reject(error.response?.data?.message || error.message || 'Server Error');
	}
}

export async function updateImageProfile(imgSRC: any) {
	try {
		const userId = await getCookie('userId');
		if (!userId) await Promise.reject();
		const response = await api.put(`/user/editImageProfile/${userId}`, imgSRC, {
			headers: {
				'Content-Type': 'application/x-www-form-urlencoded'
			}
		});
		console.log(response);
		return response.data;
	} catch (error: any) {
		return Promise.reject(error.response?.data?.message || error.message || 'Server Error');
	}
}
