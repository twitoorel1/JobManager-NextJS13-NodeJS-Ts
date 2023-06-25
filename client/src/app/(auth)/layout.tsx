'use client';

import '../globals.css';
import React, { useEffect } from 'react';
import { useAuthContext } from '@/context/AuthenticationContext';
import { useRouter } from 'next/navigation';

import Image from 'next/image';
import Link from 'next/link';
import useLoader from '@/hooks/useLoader';
import SkeletonLoader from '@/components/common/SkeletonLoader';

export default function AuthLayout({ children }: { children: React.ReactNode }) {
	const { isAuthenticated } = useAuthContext();
	const router = useRouter();
	const isLoading = useLoader(2000);

	useEffect(() => {
		if (isAuthenticated === true) {
			router.push('/');
		}
	}, [isAuthenticated, router]);

	return (
		<section>
			<main className="flex flex-col justify-center min-h-full px-5 mx-auto lg:w-1/4 lg:p-8">
				{isLoading ? <SkeletonLoader isLoading={isLoading} /> : children}
			</main>

			<div className="absolute bottom-0 items-end justify-between hidden w-full h-0 mt-10 md:flex">
				<Image className="" width={360} height={360} src="/left.svg" alt="" />
				<div className="flex gap-4 my-5 text-sm text-gray-300">
					<h3>Beta Version</h3>
					{/* <Link className="text-gray-500" href={'/'}>
						<span className="text-gray-500">Privacy Policy</span>
					</Link>
					|
					<Link className="text-gray-500" href={'/'}>
						<span className="text-gray-500">Terms Of Use</span>
					</Link>
					|
					<Link className="text-gray-500" href={'/'}>
						<span className="text-gray-500">User Manual</span>
					</Link>
					| */}
				</div>
				<Image className="hidden md:block" width={360} height={360} src="/right.svg" alt="" />
			</div>
		</section>
	);
}
