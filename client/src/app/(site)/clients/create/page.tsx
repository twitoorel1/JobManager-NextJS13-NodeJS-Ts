import React from 'react';
import Breadcrumb from '@/components/common/Breadcrumb';
import CreateClientForm from '@/features/client/components/CreateClientForm';

const CreateClient = () => {
	return (
		<div className="mx-auto max-w-[67.5rem]">
			<Breadcrumb pageName="יצירת לקוח חדש" />

			<div className="grid grid-cols-5">
				<div className="col-span-3">
					<div className="rounded-sm border border-[#E2E8F0] bg-white shadow-default">
						<div className="p-7">
							<CreateClientForm />
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default CreateClient;
