import React, { useState } from 'react';
import { useAuthContext } from '@/context/AuthenticationContext';
import { api } from '@/utils/api';
import { getCookie } from '@/utils/cookies';

import { SendBugsInputs, RootState } from '@/types/global';
import { ThunkDispatch } from 'redux-thunk';
import { AnyAction } from 'redux';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';

import { ChatBubbleLeftEllipsisIcon, XCircleIcon, ChatBubbleOvalLeftEllipsisIcon } from '@heroicons/react/24/outline';
import Image from 'next/image';
import Input from './common/Input';
import Button from './common/Button';

const Helper = () => {
	const { user } = useAuthContext();
	const [openHelper, setOpenHelper] = useState(false);

	const {
		register,
		handleSubmit,
		formState: { errors, isSubmitSuccessful }
	} = useForm<SendBugsInputs>({
		defaultValues: {
			fullName: `${user?.firstName} ${user?.lastName}`,
			clientName: 'נירלט',
			subject: '',
			description: ''
		},
		mode: 'onBlur',
		reValidateMode: 'onChange'
	});

	const onSubmitSendBugs = async (data: SendBugsInputs) => {
		try {
			const userId = await getCookie('userId');
			const response = await api.post(`/user/sendEmail/${userId}`, data);
			if (response.status === 200) {
				setTimeout(() => {
					setOpenHelper(false);
				}, 2000);
			}
			return response.data;
		} catch (error: any) {
			console.log(error.message);
		}
	};

	return (
		<div>
			{/* <span
				onClick={() => setOpenHelper(prev => !prev)}
				className="fixed bottom-0 left-0 z-50 p-3 m-3 border rounded-full cursor-pointer shadow-default border-gray-900/80 hover:border-gray-900/90"
			>
				<ChatBubbleLeftEllipsisIcon className="text-gray-900/80 h-14 w-14 hover:text-gray-900/90" />
			</span> */}

			<div className="fixed bottom-0 left-0 z-50 ml-5 mb-5 p-10 w-[54px] h-[54px] rounded-full bg-black">
				{/* <ChatBubbleOvalLeftEllipsisIcon className="text-white h-14 w-14" /> */}
			</div>

			{openHelper && (
				<div className="fixed z-50 transform -translate-x-1/2 -translate-y-1/2 bg-white border-[2px] border-[#E2E8F0] rounded-md shadow-default top-1/2 left-1/2 w-3/4 xl:w-2/5">
					<div className="grid grid-cols-5">
						<div className="col-span-5">
							<div className="rounded-sm border-[#E2E8F0] bg-white shadow-default">
								<div className="border-b border-[#E2E8F0] py-4 px-7 flex items-center justify-between">
									<h3 className="font-medium text-black">תמיכה טכנית</h3>
									<XCircleIcon onClick={() => setOpenHelper(false)} className="w-6 h-6 cursor-pointer text-gray-900/80 hover:text-gray-900/90 " />
								</div>

								<form onSubmit={handleSubmit(onSubmitSendBugs)} className="w-4/5 mx-auto p-7">
									<Input id="sendBugsFullName" type="text" defaultValue={`${user?.firstName} ${user?.lastName}`} disabled showLabel label="שם מלא" />
									<Input
										id="sendBugsClient"
										type="text"
										defaultValue={'נירלט'}
										placeholder="שם הלקוח"
										showLabel
										label="שם הלקוח"
										disabled
										register={{ ...register('clientName') }}
									/>
									<Input
										id="sendBugsSubject"
										type="text"
										placeholder="נושא התקלה"
										showLabel
										label="נושא התקלה"
										register={{ ...register('subject') }}
									/>
									<Input
										id="sendBugsDescription"
										type="text"
										placeholder="הסבר על התקלה"
										showLabel
										label="הסבר על התקלה"
										register={{ ...register('description') }}
									/>

									<Button label="שליחת תקלה" className="rounded-md" />
								</form>

								{/* Form Start 
								<form className="w-4/5 mx-auto p-7">
									<Input
										type="text"
										placeholder={`${user?.firstName} ${user?.lastName}`}
										defaultValue={`${user?.firstName} ${user?.lastName}`}
										showLabel
										label="שם מלא"
										disabled
									/>
									<Input type="text" placeholder={`נירלט`} defaultValue={`נירלט`} showLabel label="שם הלקוח" disabled />

									<Input type="text" placeholder="נושא התקלה" required showLabel label="נושא התקלה" />

									<label htmlFor="helperTextareaInput" className={`block mb-2 text-sm min-w-fit font-medium text-gray-900 dark:text-white`}>
										הסבר על התקלה
									</label>
									<textarea className="w-full mb-3 rounded-md resize-none placeholder-slate-400" placeholder="הסבר על התקלה" />

									<div className="grid grid-cols-1">
										<Button type="submit" label="שליחת תקלה" className="font-semibold rounded-md shadow-default" />
									</div>
								</form>
								{/* Form End */}
							</div>
						</div>
					</div>
				</div>
			)}
		</div>
	);
};

export default Helper;
