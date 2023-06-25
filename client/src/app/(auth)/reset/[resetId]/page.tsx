'use client';
import React, { useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import Link from 'next/link';
import ResetPasswordForm from '@/features/authentication/components/ResetPasswordForm';
import { getCookie } from '@/utils/cookies';

const ResetTokenId = () => {
	const router = useRouter();
	const params = useParams();
	// console.log(params.resetId);

	useEffect(() => {
		if (!getCookie('reset-token')) {
			router.push('/login');
		}
	}, [router, getCookie('reset-token')]);

	return (
		<div className="text-[#333333]">
			{/* Form */}
			<ResetPasswordForm />
			<p className="mt-8 mb-2 text-sm text-center">
				יש לי חשבון{' '}
				<Link className="font-bold underline underline-black" href="/login">
					התחבר
				</Link>
			</p>
		</div>
	);
};

export default ResetTokenId;
