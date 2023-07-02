import React from 'react';

interface IClientViewProps {
	params: {
		clientId: string;
	};
}

export function generateMetadata(props: IClientViewProps) {
	return {
		title: `Client View | ${props.params.clientId}`,
	};
}

const ClientID = (props: IClientViewProps) => {
	const { clientId } = props.params;

	return <div><h1>One Client</h1></div>;
};

export default ClientID;
