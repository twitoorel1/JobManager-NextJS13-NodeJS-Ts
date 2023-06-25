import React from 'react';
import { EditProfileInputs, RootState } from '@/types/global';
import { ThunkDispatch } from 'redux-thunk';
import { AnyAction } from 'redux';
import { useDispatch, useSelector } from 'react-redux';
import { editProfileByUserId, clearMessage } from '../redux/userSlice';

import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import EditProfileValidationSchema from '../validations/EditProfileValidationSchema';
import { useAuthContext } from '@/context/AuthenticationContext';

import Image from 'next/image';
import Input from '@/components/common/Input';
import Button from '@/components/common/Button';

const EditProfileForm = () => {
	const { message, isSending, isLoading } = useSelector((state: RootState) => state.user);
	const { user } = useAuthContext();

	const {
		register,
		handleSubmit,
		formState: { errors, isSubmitSuccessful }
	} = useForm<EditProfileInputs>({
		resolver: yupResolver(EditProfileValidationSchema),
		defaultValues: {
			firstName: user?.firstName,
			lastName: user?.lastName,
			email: user?.email,
			username: user?.username
		},
		mode: 'onBlur',
		reValidateMode: 'onChange'
	});
	const dispatch: ThunkDispatch<{}, {}, AnyAction> = useDispatch();

	const onSubmitEditProfile = async (data: EditProfileInputs) => {
		try {
			const editProfile = await dispatch(editProfileByUserId(data));
			setTimeout(() => {
				if (editProfile.meta.requestStatus === 'fulfilled') {
					dispatch(clearMessage());
				}
			}, 1500);
		} catch (error: any) {
			console.log(error.message);
		}
	};

	return (
		<form onSubmit={handleSubmit(onSubmitEditProfile) as any}>
			<div className="flex flex-col gap-3 mb-3 sm:flex-row">
				<div className="w-full sm:w-1/2">
					<Input
						id="editProfileFirstNameInput"
						type="text"
						defaultValue={user?.firstName}
						placeholder={user?.firstName}
						showLabel
						label="שם פרטי"
						required={false}
						register={{ ...register('firstName') }}
					/>
					{errors.firstName && <span className="mx-5">{errors.firstName.message}</span>}
				</div>
				<div className="w-full sm:w-1/2">
					<Input
						id="editProfileLastNameInput"
						type="text"
						defaultValue={user?.lastName}
						placeholder={user?.lastName}
						showLabel
						label="שם משפחה"
						required={false}
						register={{ ...register('lastName') }}
					/>
					{errors.lastName && <span className="mx-5">{errors.lastName.message}</span>}
				</div>
			</div>
			<div className="mb-[1.375rem]">
				<Input
					id="editProfileEmailInput"
					type="email"
					defaultValue={user?.email}
					placeholder={user?.email}
					showLabel
					label="כתובת אימייל"
					required={false}
					register={{ ...register('email') }}
				/>
				{errors.email && <span className="mx-5">{errors.email.message}</span>}
			</div>
			<div className="mb-[1.375rem]">
				<Input
					id="editProfileUsernameInput"
					type="text"
					defaultValue={user?.username}
					placeholder={user?.username}
					showLabel
					label="שם משתמש"
					required={false}
					register={{ ...register('username') }}
				/>
				{errors.username && <span className="mx-5">{errors.username.message}</span>}
			</div>

			{isLoading ? (
				<Button className="flex items-center rounded-md justify-evenly">
					<span>אנא המתן....</span>
					<Image src="/loading/loading.svg" alt="Loading" width={30} height={30} />
				</Button>
			) : (
				<Button label="התחבר" className="rounded-md" />
			)}

			{isSubmitSuccessful && message && isSending && (
				<div className="text-right">
					<span className="font-semibold text-center text-md">{message}</span>
				</div>
			)}
		</form>
	);
};

export default EditProfileForm;
