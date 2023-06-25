'use client';

import React from 'react';
import Breadcrumb from '@/components/common/Breadcrumb';
import EditPasswordForm from '@/features/user/components/EditPasswordForm';

const EditPassword = () => {
	return (
		<div className="mx-auto max-w-[67.5rem]">
			<Breadcrumb pageName="שינוי סיסמה" />

			<div className="grid grid-cols-5 gap-8 ">
				<div className="col-span-5 xl:col-span-3 xl:col-start-2">
					<div className="rounded-sm border-[#E2E8F0] bg-white shadow-default">
						<div className="border-b border-[#E2E8F0] py-4 px-7">
							<h3 className="font-medium text-black">הגדרות הסיסמה שלך</h3>
						</div>

						<div className="p-7">
							<EditPasswordForm />
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default EditPassword;
