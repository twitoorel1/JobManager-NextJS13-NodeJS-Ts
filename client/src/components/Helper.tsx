import React, { useState } from 'react';
import { useAuthContext } from '@/context/AuthenticationContext';
import { api } from '@/utils/api';
import { getCookie } from '@/utils/cookies';

import { SendBugsInputs } from '@/types/global';
import { useForm } from 'react-hook-form';
import { ChatBubbleOvalLeftEllipsisIcon, XCircleIcon, XMarkIcon } from '@heroicons/react/24/outline';

import Input from './common/Input';
import Button from './common/Button';
import Image from 'next/image';

const Helper = () => {
	const { user } = useAuthContext();
	const [openHelper, setOpenHelper] = useState(false);
	const [sendBug, setSendBug] = useState(false);

	const {
		register,
		handleSubmit,
		reset,
		formState: { isSubmitSuccessful }
	} = useForm<SendBugsInputs>({
		defaultValues: {
			subject: '',
			description: ''
		},
		mode: 'onBlur',
		reValidateMode: 'onChange'
	});

	const onSubmitSendBugs = async (data: SendBugsInputs) => {
		try {
			setSendBug(true);
			const userId = await getCookie('userId');
			const response = await api.post(`/user/sendEmail/${userId}`, data);

			if (response.status === 200) {
				setSendBug(false);
			}
			setTimeout(() => {
				setOpenHelper(false);
				reset();
			}, 2500);
		} catch (error: any) {
			console.log(error.message);
		}
	};

	return (
		<div className="relative hidden md:flex">
			<div className="fixed bottom-9 left-9">
				<div
					onClick={() => setOpenHelper(prev => !prev)}
					className="bg-[#111827] text-white p-[10px] rounded-full shadow-default cursor-pointer duration-300 border-[2px] border-[#111827] hover:bg-white hover:border-[2px] hover:border-[#111827] hover:text-[#111827]"
				>
					{openHelper ? <XMarkIcon width={50} height={50} /> : <ChatBubbleOvalLeftEllipsisIcon width={50} height={50} />}
				</div>
			</div>

			{openHelper && (
				<div className="fixed top-1/2 z-50 transform -translate-x-1/2 -translate-y-1/2 w-3/4 xl:w-2/5">
					<div className="rounded-sm border border-[#E2E8F0] bg-white shadow-default">
						<div className="border-b border-[#E2E8F0] py-4 px-7 flex items-center justify-between">
							<h3 className="font-bold text-black text-xl">תמיכה טכנית</h3>
							<XCircleIcon width={25} height={25} onClick={() => setOpenHelper(prev => prev === false)} className="cursor-pointer" />
						</div>

						<form onSubmit={handleSubmit(onSubmitSendBugs)} className="py-4 px-20">
							<Input id="sendBugsFullName" type="text" defaultValue={`${user?.firstName} ${user?.lastName}`} disabled showLabel label="שם מלא" />
							<Input id="sendBugsClient" type="text" defaultValue={user?.company.name} showLabel label="שם הלקוח" disabled />
							<Input id="sendBugsSubject" type="text" placeholder="נושא התקלה" showLabel label="נושא התקלה" register={{ ...register('subject') }} />
							<Input
								id="sendBugsDescription"
								type="text"
								placeholder="הסבר על התקלה"
								showLabel
								label="הסבר על התקלה"
								register={{ ...register('description') }}
							/>

							{sendBug ? (
								<Button className="flex items-center rounded-md justify-evenly">
									<span>אנא המתן....</span>
									<Image src="/loading/loading.svg" alt="Loading" width={30} height={30} />
								</Button>
							) : (
								<Button label="שליחת תקלה" className="rounded-md" />
							)}

							{isSubmitSuccessful && sendBug === false && (
								<div className="text-right">
									<span className="font-semibold text-center text-md">נשלח בהצלחה</span>
								</div>
							)}
						</form>
					</div>
				</div>
			)}
		</div>
	);
};

export default Helper;
