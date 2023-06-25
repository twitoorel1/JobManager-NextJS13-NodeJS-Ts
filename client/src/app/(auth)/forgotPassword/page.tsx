import React from 'react';
import Link from 'next/link';
import ForgotPasswordForm from '@/features/authentication/components/ForgotPasswordForm';

export const metadata = {
	title: 'Forgot Password',
	description: 'Generated by Next.js'
};

const page = () => {
	return (
		<div className="text-[#333333]">
			<ForgotPasswordForm />
			<p className="mt-8 mb-2 text-sm text-center">
				יש לי חשבון{' '}
				<Link href="/login" className="font-bold underline underline-black">
					התחבר
				</Link>
			</p>
		</div>
	);
};

export default page;