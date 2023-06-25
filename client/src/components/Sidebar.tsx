import React, { Fragment, useState } from 'react';
import { RootState } from '@/types/global';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { useSelector } from 'react-redux';

import { Dialog, Transition } from '@headlessui/react';
import { Cog6ToothIcon, XMarkIcon, FingerPrintIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import { classNames } from '@/utils/general';
import { BsChevronDown } from 'react-icons/bs';
import SidebarLinkGroup from '@/components/common/SidebarLinkGroup';

interface ISidebarProps {
	setSidebarOpen?: any;
	sidebarOpen?: any;
	setSubMenuOpen?: any;
	subMenuOpen?: any;
	navigation: any;
}

const Sidebar = ({ setSidebarOpen, sidebarOpen, setSubMenuOpen, subMenuOpen, navigation }: ISidebarProps) => {
	const { user } = useSelector((state: RootState) => state.auth);
	const pathname = usePathname();

	const [menuOpen, setMenuOpen] = useState<string | number>(-1);

	const toggleSubMenu = (index: any) => {
		if (menuOpen === index) {
			setMenuOpen(-1); // Close the submenu if it's already open
		} else {
			setMenuOpen(index); // Open the clicked submenu
		}
	};

	return (
		<>
			<Transition.Root show={sidebarOpen} as={Fragment}>
				<Dialog as="div" className="relative z-50 lg:hidden" onClose={setSidebarOpen}>
					<Transition.Child
						as={Fragment}
						enter="transition-opacity ease-linear duration-100"
						enterFrom="opacity-0"
						enterTo="opacity-100"
						leave="transition-opacity ease-linear duration-100"
						leaveFrom="opacity-100"
						leaveTo="opacity-0"
					>
						<div className="fixed inset-0 bg-gray-900/80" />
					</Transition.Child>

					<div className="fixed inset-0 flex">
						<Transition.Child
							as={Fragment}
							enter="transition ease-in-out duration-300 transform"
							enterFrom="translate-x-full"
							enterTo="translate-x-0"
							leave="transition ease-in-out duration-300 transform"
							leaveFrom="translate-x-0"
							leaveTo="translate-x-full"
						>
							<Dialog.Panel className="relative flex flex-1 w-full max-w-xs ml-16">
								<Transition.Child
									as={Fragment}
									enter="ease-in-out duration-300"
									enterFrom="opacity-0"
									enterTo="opacity-100"
									leave="ease-in-out duration-300"
									leaveFrom="opacity-100"
									leaveTo="opacity-0"
								>
									<div className="absolute top-0 flex justify-center w-16 pt-5 right-full">
										<button type="button" className="-m-2.5 p-2.5" onClick={() => setSidebarOpen(false)}>
											<span className="sr-only">Close sidebar</span>
											<XMarkIcon className="w-6 h-6 text-white" aria-hidden="true" />
										</button>
									</div>
								</Transition.Child>

								{/* Sidebar component, swap this element with another sidebar if you like */}
								<div className="flex flex-col px-6 pb-4 overflow-y-auto bg-gray-900 grow gap-y-5 ring-1 ring-white/10">
									<div className="flex items-center h-20 shrink-0">
										<Image className="w-12 h-12" width={12} height={12} src="/favicon.ico" alt="Logo" />
										<span className="mr-3 text-2xl font-semibold text-white">בואינג</span>
									</div>

									<nav className="flex flex-col flex-1">
										<ul role="list" className="flex flex-col flex-1 gap-y-7">
											<li>
												<ul role="list" className="-mx-2 space-y-1 text-white">
													{navigation
														.filter((menuFilter: any) => {
															if (menuFilter.roles === user?.role || !menuFilter.roles || user?.role === 'admin') return true;
														})
														.map((item: any, index: string) => {
															return (
																<Fragment key={index}>
																	<li>
																		<Link
																			href={item.href}
																			className={classNames(
																				pathname === item.href ? 'bg-gray-800 text-white' : 'text-gray-400 hover:text-white hover:bg-gray-800',
																				'group flex items-center gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold duration-300'
																			)}
																			onClick={() => toggleSubMenu(index)}
																		>
																			<item.icon className="w-6 h-6 shrink-0" aria-hidden="true" />
																			{item.name}
																			{item.submenu && (
																				<BsChevronDown className={`${menuOpen === index ? 'rotate-180 duration-700' : 'duration-700'}`} />
																			)}
																		</Link>
																	</li>

																	{item.submenu && menuOpen === index && (
																		<ul>
																			{item.submenuItems.map((submenuItem: any, index: string) => (
																				<li key={index} className="bg-gray-50/10">
																					<Link
																						href={submenuItem.href}
																						className={classNames(
																							pathname === submenuItem.href
																								? 'bg-gray-800 text-white'
																								: 'text-gray-400 hover:text-white hover:bg-gray-800',
																							'group flex items-center gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold'
																						)}
																					>
																						<submenuItem.icon className="w-6 h-6 shrink-0" aria-hidden="true" />
																						{submenuItem.name}
																					</Link>
																				</li>
																			))}
																		</ul>
																	)}
																</Fragment>
															);
														})}
												</ul>
											</li>

											{/* Team Links */}
											{/* <li>
												<div className="text-xs font-semibold leading-6 text-gray-400">Your teams</div>
												<ul role="list" className="mt-2 -mx-2 space-y-1">
													{teams.map(team => (
														<li key={team.name}>
															<Link
																href={team.href}
																className={classNames(
																	team.current ? 'bg-gray-800 text-white' : 'text-gray-400 hover:text-white hover:bg-gray-800',
																	'group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold'
																)}
															>
																<span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-lg border border-gray-700 bg-gray-800 text-[0.625rem] font-medium text-gray-400 group-hover:text-white">
																	{team.initial}
																</span>
																<span className="truncate">{team.name}</span>
															</Link>
														</li>
													))}
												</ul>
											</li> */}

											<li className="mt-auto">
												{user?.role === 'admin' && (
													<Link
														href="/admin"
														className="flex p-2 -mx-2 text-sm font-semibold leading-6 text-black duration-300 bg-gray-100 rounded-md group gap-x-3 hover:bg-gray-300 hover:text-black"
													>
														<FingerPrintIcon className="w-6 h-6 shrink-0" aria-hidden="true" />
														מנהל מערכת
													</Link>
												)}
												<Link
													href="/account"
													className="flex p-2 -mx-2 text-sm font-semibold leading-6 text-gray-400 duration-300 rounded-md group gap-x-3 hover:bg-gray-800 hover:text-white"
												>
													<Cog6ToothIcon className="w-6 h-6 shrink-0" aria-hidden="true" />
													הגדרות
												</Link>
												<span className="text-sm text-gray-300">Beta Version</span>
											</li>
										</ul>
									</nav>
								</div>
							</Dialog.Panel>
						</Transition.Child>
					</div>
				</Dialog>
			</Transition.Root>

			{/* Static sidebar for desktop */}
			<div className="hidden lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:w-72 lg:flex-col">
				{/* Sidebar component, swap this element with another sidebar if you like */}
				<div className="flex flex-col px-6 pb-4 overflow-y-auto bg-gray-900 grow gap-y-5">
					<div className="flex items-center h-20 shrink-0">
						<Image width={12} height={12} className="w-12 h-12" src="/favicon.ico" alt="logo" />
						<span className="mr-3 text-2xl font-semibold text-white">בואינג</span>
					</div>

					<nav className="flex flex-col flex-1">
						<ul role="list" className="flex flex-col flex-1 gap-y-7">
							<li>
								<ul role="list" className="-mx-2 space-y-1 text-white">
									{navigation
										.filter((menuFilter: any) => {
											if (menuFilter.roles === user?.role || !menuFilter.roles || user?.role === 'admin') return true;
										})
										.map((item: any, index: string) => {
											return (
												<Fragment key={index}>
													<li>
														<Link
															href={item.href}
															className={classNames(
																pathname === item.href ? 'bg-gray-800 text-white' : 'text-gray-400 hover:text-white hover:bg-gray-800',
																'group flex items-center gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold duration-300'
															)}
															onClick={() => toggleSubMenu(index)}
														>
															<item.icon className="w-6 h-6 shrink-0" aria-hidden="true" />
															{item.name}
															{item.submenu && <BsChevronDown className={`${menuOpen === index ? 'rotate-180 duration-700' : 'duration-700'}`} />}
														</Link>
													</li>

													{item.submenu && menuOpen === index && (
														<ul>
															{item.submenuItems.map((submenuItem: any, index: string) => (
																<li key={index} className="bg-gray-50/10">
																	<Link
																		href={submenuItem.href}
																		className={classNames(
																			pathname === submenuItem.href ? 'bg-gray-800 text-white' : 'text-gray-400 hover:text-white hover:bg-gray-800',
																			'group flex items-center gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold'
																		)}
																	>
																		<submenuItem.icon className="w-6 h-6 shrink-0" aria-hidden="true" />
																		{submenuItem.name}
																	</Link>
																</li>
															))}
														</ul>
													)}
												</Fragment>
											);
										})}
								</ul>
							</li>

							{/* Team */}
							{/* <li>
								<div className="text-xs font-semibold leading-6 text-gray-400">Your teams</div>
								<ul role="list" className="mt-2 -mx-2 space-y-1">
									{teams.map(team => (
										<li key={team.name}>
											<Link
												href={team.href}
												className={classNames(
													team.current ? 'bg-gray-800 text-white' : 'text-gray-400 hover:text-white hover:bg-gray-800',
													'group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold'
												)}
											>
												<span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-lg border border-gray-700 bg-gray-800 text-[0.625rem] font-medium text-gray-400 group-hover:text-white">
													{team.initial}
												</span>
												<span className="truncate">{team.name}</span>
											</Link>
										</li>
									))}
								</ul>
							</li> */}

							<li className="mt-auto">
								{user?.role === 'admin' && (
									<Link
										href="/admin"
										className="flex p-2 -mx-2 text-sm font-semibold leading-6 text-black duration-300 bg-gray-100 rounded-md group gap-x-3 hover:bg-gray-300 hover:text-black"
									>
										<FingerPrintIcon className="w-6 h-6 shrink-0" aria-hidden="true" />
										מנהל מערכת
									</Link>
								)}
								<Link
									href="/account"
									className="flex p-2 -mx-2 text-sm font-semibold leading-6 text-gray-400 duration-300 rounded-md group gap-x-3 hover:bg-gray-800 hover:text-white"
								>
									<Cog6ToothIcon className="w-6 h-6 shrink-0" aria-hidden="true" />
									הגדרות
								</Link>
								<span className="text-sm text-gray-300">Beta Version</span>
							</li>
						</ul>
					</nav>
				</div>
			</div>
		</>
	);
};

export default Sidebar;
