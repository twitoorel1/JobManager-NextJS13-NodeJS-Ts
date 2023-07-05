'use client';
import React, { useEffect, useState } from 'react';
import { ThunkDispatch } from 'redux-thunk';
import { AnyAction } from 'redux';
import { useDispatch } from 'react-redux';
import { findOneCompanyById } from '@/features/client/redux/clientSlice';

interface IClientViewProps {
	params: {
		clientId: string;
	};
}

export function generateMetadata(props: IClientViewProps) {
	return {
		title: `Client View | ${props.params.clientId}`
	};
}

const ClientID = (props: IClientViewProps) => {
	const { clientId } = props.params;

	const [clientOne, setClientOne] = useState<{ company: any | null }>({ company: null });
	const dispatch: ThunkDispatch<{}, {}, AnyAction> = useDispatch();

	useEffect(() => {
		dispatch(findOneCompanyById(clientId))
			.then(data => setClientOne(data.payload))
			.catch(err => console.log(err));
	}, [dispatch]);

	return (
		<div>
			<h1>Name: {clientOne.company?.name}</h1>
			<h1>BnNumber: {clientOne.company?.bnNumber}</h1>
			<h1>Email: {clientOne.company?.email}</h1>
			<h1>Phone: {clientOne.company?.phone}</h1>
		</div>
	);
};

export default ClientID;
