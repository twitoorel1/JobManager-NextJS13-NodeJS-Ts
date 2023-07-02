import React from 'react';
import Button from '@/components/common/Button';
import Link from 'next/link';
import { EyeIcon, PencilSquareIcon } from '@heroicons/react/24/outline';

const people = [
	{
		id: 1,
		name: 'איתי טוויטו',
		idNumber: 205455755,
		email: 'itaytwito@gmail.com',
		phone: '05425262514',
		createdBy: 'אוראל טוויטו',
		address: 'נתיבות, צה"ל 19 דירה 2',
		age: 17,
		gender: 'גבר'
	}
];

export const metadata = {
	title: 'Candidates',
	description: 'Candidates View Page Description',
	keywords: 'Boeing HRM'
};

const Candidates = () => {
	return (
		<div className="px-4 sm:px-6 lg:px-8">
			<div className="sm:flex sm:items-center">
				<div className="sm:flex-auto">
					<h1 className="text-base font-semibold leading-6 text-gray-900">רשימת מעומדים</h1>
					<p className="mt-2 text-sm text-gray-700">רשימת כל המעומדים הזמינים כרגע</p>
				</div>

				<div className="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
					<Link href={'/candidates/create'}>
						<Button
							type="button"
							className="block rounded-md px-3 py-2 text-center text-sm font-semibold text-white shadow-default focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
							label="הוסף מעומד"
						/>
					</Link>
				</div>
			</div>

			<div className="mt-8 flow-root">
				<div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
					<div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
						<table className="min-w-full divide-y divide-white-200 shadow-default border">
							<thead>
								<tr>
									<th scope="col" className="py-3.5 pl-4 pr-3 text-sm font-semibold text-gray-900 sm:pl-0">
										שם מלא
									</th>
									<th scope="col" className="py-3.5 pl-4 pr-3 text-sm font-semibold text-gray-900 sm:pl-0">
										ת"ז
									</th>
									<th scope="col" className="py-3.5 pl-4 pr-3 text-sm font-semibold text-gray-900 sm:pl-0">
										אימייל
									</th>
									<th scope="col" className="py-3.5 pl-4 pr-3 text-sm font-semibold text-gray-900 sm:pl-0">
										פלאפון
									</th>
									<th scope="col" className="py-3.5 pl-4 pr-3 text-sm font-semibold text-gray-900 sm:pl-0">
										נוצר על ידי
									</th>
									<th scope="col" className="py-3.5 pl-4 pr-3 text-sm font-semibold text-gray-900 sm:pl-0">
										כתובת
									</th>
									<th scope="col" className="py-3.5 pl-4 pr-3 text-sm font-semibold text-gray-900 sm:pl-0">
										גיל
									</th>
									<th scope="col" className="py-3.5 pl-4 pr-3 text-sm font-semibold text-gray-900 sm:pl-0">
										מגדר
									</th>
									<th scope="col" className="py-3.5 pl-4 pr-3 text-sm font-semibold text-gray-900 sm:pl-0">
										פעולות
									</th>
								</tr>
							</thead>

							<tbody className="text-center">
								{people.map((item, index) => (
									<tr key={index}>
										<td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{item.name}</td>
										<td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{item.idNumber}</td>
										<td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{item.email}</td>
										<td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{item.phone}</td>
										<td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{item.createdBy}</td>
										<td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{item.address}</td>
										<td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{item.age}</td>
										<td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{item.gender}</td>
										<td className="relative flex items-center justify-center whitespace-nowrap py-4 px-4 text-center text-sm font-medium">
											<Link href={`/candidates/${item.id}/edit`} className="text-[#0073EA] hover:text-[#0060b9] px-3">
												<PencilSquareIcon width={15} />
											</Link>
											<Link href={`/candidates/${item.id}`} className="text-[#0073EA] hover:text-[#0060b9] px-3">
												<EyeIcon width={15} />
											</Link>
										</td>
									</tr>
								))}
							</tbody>
						</table>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Candidates;
