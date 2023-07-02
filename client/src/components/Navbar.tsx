import React, { Fragment } from 'react';
import { useAuthContext } from '@/context/AuthenticationContext';

import { Bars3Icon, BellIcon, ChevronDownIcon, AdjustmentsHorizontalIcon } from '@heroicons/react/24/outline';
import { Menu, Transition } from '@headlessui/react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useDispatch } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';
import { AnyAction } from 'redux';
import { logoutByToken } from '@/features/authentication/redux/authSlice';
import { classNames, getFileFromPublicFolder } from '@/utils/general';
import { getCookie } from '@/utils/cookies';

interface INavbar {
	setSidebarOpen?: any;
	userNavigation: any;
}

const Navbar = ({ setSidebarOpen, userNavigation }: INavbar) => {
	const router = useRouter();
	const dispatch: ThunkDispatch<{}, {}, AnyAction> = useDispatch();
	const { user } = useAuthContext();
	const userId = getCookie('userId');

	const LogoutUser = async () => {
		await dispatch(logoutByToken());
		router.push('/login');
	};

	return (
		<div className="sticky top-0 z-40 flex items-center h-16 px-4 bg-white border-b border-gray-200 shadow-sm shrink-0 gap-x-4 sm:gap-x-6 sm:px-6 lg:px-8">
			<button type="button" className="-m-2.5 p-2.5 text-gray-700 lg:hidden" onClick={() => setSidebarOpen(true)}>
				<span className="sr-only">Open sidebar</span>
				<Bars3Icon className="w-6 h-6" aria-hidden="true" />
			</button>

			{/* Separator */}
			<div className="w-px h-6 bg-gray-900/10 lg:hidden" aria-hidden="true" />

			{/* Menu */}
			<div className="flex self-stretch flex-1 gap-x-4 lg:gap-x-6">
				{/* Right */}
				<div className="flex items-center justify-center bg-green-200">
					<h4 className="p-3 font-bold">{user?.role.toUpperCase()}</h4>
				</div>

				{/* Left */}
				<div className="flex items-center mr-auto gap-x-4 lg:gap-x-6">
					<button type="button" className="-m-2.5 p-2.5 text-gray-400 hover:text-gray-500">
						<span className="sr-only">View notifications</span>
						<BellIcon className="w-6 h-6" aria-hidden="true" />
					</button>
					{/* Separator */}
					<div className="hidden lg:block lg:h-6 lg:w-px lg:bg-gray-900/10" aria-hidden="true" />
					{/* Profile Dropdown */}
					<Menu as="div" className="relative">
						<Menu.Button className="-m-1.5 flex items-center p-1.5">
							<span className="sr-only">Open user menu</span>
							<Image
								className="w-8 h-8 rounded-full bg-gray-50 pointer-events-none"
								width={100}
								height={100}
								src={user?.imgSRC ? getFileFromPublicFolder(user?.imgSRC, '/public/') : '/avatar/user-03.png'}
								alt={`תמונת פרופיל של ${user && `${user.firstName} ${user.lastName}`}`}
							/>
							<span className="hidden lg:flex lg:items-center">
								<span className="mr-4 text-sm font-semibold leading-6 text-gray-900" aria-hidden="true">
									{user && `${user.firstName}  ${user.lastName}`}
								</span>
								<ChevronDownIcon className="w-5 h-5 mr-2 text-gray-400" aria-hidden="true" />
							</span>
						</Menu.Button>
						<Transition
							as={Fragment}
							enter="transition ease-out duration-100"
							enterFrom="transform opacity-0 scale-95"
							enterTo="transform opacity-100 scale-100"
							leave="transition ease-in duration-75"
							leaveFrom="transform opacity-100 scale-100"
							leaveTo="transform opacity-0 scale-95"
						>
							<Menu.Items className="absolute left-0 z-10 mt-2.5 w-32 origin-top-right rounded-md bg-white py-2 shadow-lg ring-1 ring-gray-900/5 focus:outline-none">
								{userNavigation.map((item: any, index: string) => (
									<Menu.Item key={index}>
										{({ active }) =>
											item.isFunction ? (
												<Link
													href={item.href}
													className={classNames(active ? 'bg-gray-50' : '', 'block px-3 py-1 text-sm leading-6 text-gray-900')}
													onClick={() => LogoutUser()}
												>
													{item.name}
												</Link>
											) : (
												<Link href={item.href} className={classNames(active ? 'bg-gray-50' : '', 'block px-3 py-1 text-sm leading-6 text-gray-900')}>
													{item.name}
												</Link>
											)
										}
									</Menu.Item>
								))}
							</Menu.Items>
						</Transition>
					</Menu>
				</div>
			</div>
		</div>
	);
};

export default Navbar;
