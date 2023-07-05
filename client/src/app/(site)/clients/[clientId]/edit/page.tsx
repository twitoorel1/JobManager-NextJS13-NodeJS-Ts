import React from 'react';
import Breadcrumb from '@/components/common/Breadcrumb';
import EditClientForm from '@/features/client/components/EditClientForm';

interface IClientEditProps {
	params: {
		clientId: string;
	};
}

export function generateMetadata(props: IClientEditProps) {
	return {
		title: `Edit Client | ${props.params.clientId}`
	};
}

const EditClient = (props: IClientEditProps) => {
	const { clientId } = props.params;

	return (
		<div className="mx-auto max-w-[67.5rem]">
			<Breadcrumb pageName="עריכת לקוח" />

			<div className="grid grid-cols-5">
				<div className="col-span-3">
					<div className="rounded-sm border border-[#E2E8F0] bg-white shadow-default">
						<div className="p-7">
							<EditClientForm clientId={clientId} />
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default EditClient;
