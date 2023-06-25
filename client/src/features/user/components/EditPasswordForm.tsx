import React from 'react';
import { EditPasswordInputs, RootState } from '@/types/global';
import { ThunkDispatch } from 'redux-thunk';
import { AnyAction } from 'redux';
import { useDispatch, useSelector } from 'react-redux';
import { editPasswordByUserId, clearMessage } from '../redux/userSlice';

import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import EditPasswordValidationSchema from '../validations/EditPasswordValidationSchema';
import { useAuthContext } from '@/context/AuthenticationContext';

import Image from 'next/image';
import Input from '@/components/common/Input';
import Button from '@/components/common/Button';

const EditPasswordForm = () => {
	const { message, isSending, isLoading } = useSelector((state: RootState) => state.user);

	const {
		register,
		handleSubmit,
		formState: { errors, isSubmitSuccessful }
	} = useForm<EditPasswordInputs>({
		resolver: yupResolver(EditPasswordValidationSchema),
		defaultValues: {
			oldPassword: '',
			newPassword: '',
			confirmPassword: ''
		},
		mode: 'onBlur',
		reValidateMode: 'onChange'
	});
	const dispatch: ThunkDispatch<{}, {}, AnyAction> = useDispatch();

	const onSubmitEditPassword = async (data: EditPasswordInputs) => {
		try {
			const editPassword = await dispatch(editPasswordByUserId(data));
			setTimeout(() => {
				if (editPassword.meta.requestStatus === 'fulfilled') {
					dispatch(clearMessage());
				}
			}, 1500);
		} catch (error: any) {
			console.log(error.message);
		}
	};

	return (
		<form onSubmit={handleSubmit(onSubmitEditPassword) as any}>
			<div className="mb-[1.375rem]">
				<Input
					id="editPasswordCurrentPasswordInput"
					type="password"
					placeholder="******"
					showLabel
					label="סיסמה נוכחית"
					register={{ ...register('oldPassword') }}
				/>
				{errors.oldPassword && <span className="mx-5">{errors.oldPassword.message}</span>}
			</div>

			<div className="flex flex-col gap-3 mb-3 sm:flex-row">
				<div className="w-full sm:w-1/2">
					<Input
						id="editPasswordNewPasswordInput"
						type="password"
						placeholder="******"
						showLabel
						label="סיסמה חדשה"
						register={{ ...register('newPassword') }}
					/>
					{errors.newPassword && <span className="mx-5">{errors.newPassword.message}</span>}
				</div>
				<div className="w-full sm:w-1/2">
					<Input
						id="editPasswordNewPasswordTwoInput"
						type="password"
						placeholder="******"
						showLabel
						label="אימות סיסמה חדשה"
						register={{ ...register('confirmPassword') }}
					/>
					{errors.confirmPassword && <span className="mx-5">{errors.confirmPassword.message}</span>}
				</div>
			</div>

			{isLoading ? (
				<Button className="flex items-center rounded-md justify-evenly">
					<span>אנא המתן....</span>
					<Image src="/loading/loading.svg" alt="Loading" width={30} height={30} />
				</Button>
			) : (
				<Button label="לשמור" className="rounded-md" />
			)}

			{isSubmitSuccessful && message && isSending && (
				<div className="text-right">
					<span className="font-semibold text-center text-md">{message}</span>
				</div>
			)}
		</form>
	);
};

export default EditPasswordForm;
