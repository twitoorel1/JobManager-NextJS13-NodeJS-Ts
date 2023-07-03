import { api } from '@/utils/api';
import { getCookie } from '@/utils/cookies';

/* Routes For employee And Admin */
export async function findAllCompany() {
	try {
		const response = await api.get(`/company/employee/allCompanies`);
		return response.data;
	} catch (error: any) {
		return Promise.reject(error.response?.data?.message || error.message || 'Server Error');
	}
}

export async function findCompanyById(idCompany: string) {
	try {
		const response = await api.get(`/company/employee/find/${idCompany}`);
		return response.data;
	} catch (error: any) {
		return Promise.reject(error.response?.data?.message || error.message || 'Server Error');
	}
}

/* Routes For Only Admin */
export async function createClient(formValue: object) {
	try {
		const response = await api.post(`/company/admin/create`, formValue);
		return response.data;
	} catch (error: any) {
		return Promise.reject(error.response?.data?.message || error.message || 'Server Error');
	}
}
