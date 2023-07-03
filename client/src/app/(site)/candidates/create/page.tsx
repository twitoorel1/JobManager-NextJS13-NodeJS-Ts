import React from 'react';
import Breadcrumb from '@/components/common/Breadcrumb';
import CreateCandidateForm from '@/features/candidate/components/CreateCandidateForm';

const CreateCandidate = () => {
	return (
		<div className="mx-auto max-w-[67.5rem]">
			<Breadcrumb pageName="יצירת מעומד חדש" />

			<div className="grid grid-cols-5">
				<div className="col-span-3">
					<div className="rounded-sm border border-[#E2E8F0] bg-white shadow-default">
						<div className="p-7">
							<CreateCandidateForm />
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default CreateCandidate;
