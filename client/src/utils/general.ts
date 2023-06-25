import React, { FC } from 'react';
type MenuItem = Required<MenuProps>['items'][number];
import type { MenuProps } from 'antd';
import { api } from './api';
import { getCookie } from '@/utils/cookies';

export function getItem(label: React.ReactNode, key?: React.Key | null, icon?: React.ReactNode, children?: MenuItem[], type?: 'group'): MenuItem {
	return {
		key,
		icon,
		children,
		label,
		type
	} as MenuItem;
}

export const getFileFromPublicFolder = (url: string, wordToDelete: string): string => {
	let startIndex = url.indexOf(wordToDelete);
	let endIndex = startIndex + wordToDelete.length;
	let updatedUrl = url.substring(0, startIndex) + url.substring(endIndex);

	return `${process.env.NEXT_PUBLIC_REST_API_URL_ENDPOINT}${updatedUrl}`;
};

export function classNames(...classes: any[]) {
	return classes.filter(Boolean).join(' ');
}

// Send Email Message
type ISendEmail = {
	from: string;
	client: string;
	subject: string;
	body: string;
};

export const SendEmail: FC<ISendEmail> = async ({ from, client, subject, body }) => {
	try {
		const userId = await getCookie('userId');
		const response = await api.post(`/user/sendEmail/${userId}`, {
			from,
			client,
			subject,
			body
		});
		return response.data;
	} catch (error: any) {
		console.error('An error occurred while sending the email', error);
	}
};
