'use client';

import '../globals.css';
import React, { useEffect } from 'react';
import { useAuthContext } from '@/context/AuthenticationContext';
import { useRouter } from 'next/navigation';

import useLoader from '@/hooks/useLoader';
import SkeletonLoader from '@/components/common/SkeletonLoader';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
	const { isAuthenticated, user } = useAuthContext();
	const router = useRouter();
	const isLoading = useLoader(2000);

	useEffect(() => {
		if (isAuthenticated === true && user?.role !== 'admin') {
			router.push('/');
		}
	}, [isAuthenticated, router, user?.role]);

	return (
		<section>
			<h1>Admin Layout</h1>

			<main className="flex flex-col justify-center min-h-full px-5 mx-auto lg:w-1/4 lg:p-8">
				{isLoading ? <SkeletonLoader isLoading={isLoading} /> : children}
			</main>
		</section>
	);
}
