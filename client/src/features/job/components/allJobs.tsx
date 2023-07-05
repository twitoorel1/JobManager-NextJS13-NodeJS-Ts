import React, { useEffect, useState } from 'react';
import { ThunkDispatch } from 'redux-thunk';
import { AnyAction } from 'redux';
import { useDispatch } from 'react-redux';
// import { findAllCompanies } from '../redux/clientSlice';

import { EyeIcon, PencilSquareIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';

const allClients = () => {
	const [clients, setClients] = useState<{ allCompanies: any[] | null }>({ allCompanies: null });
	const dispatch: ThunkDispatch<{}, {}, AnyAction> = useDispatch();

	// useEffect(() => {
	// 	dispatch(findAllCompanies()).then(data => setClients(data.payload));
	// }, [dispatch]);

	return (
		<>
			Jobs List
			{/* {clients &&
				clients.allCompanies?.map((client: any, index: any) => (
					<tr key={index}>
						<td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{client.name}</td>
						<td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{client.bnNumber}</td>
						<td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{client.email}</td>
						<td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{client.phone}</td>
						<td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{client.address.city}</td>
						<td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{client.jobNumber}</td>
						<td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{client.candidateNumber}</td>
						<td className="relative flex items-center justify-center whitespace-nowrap py-4 px-4 text-center text-sm font-medium">
							<Link href={`/clients/${client.id}/edit`} className="text-[#0073EA] hover:text-[#0060b9] px-3">
								<PencilSquareIcon width={15} />
							</Link>
							<Link href={`/clients/${client.id}`} className="text-[#0073EA] hover:text-[#0060b9] px-3">
								<EyeIcon width={15} />
							</Link>
						</td>
					</tr>
				))} */}
		</>
	);

	// return <div>11</div>;
};

export default allClients;
