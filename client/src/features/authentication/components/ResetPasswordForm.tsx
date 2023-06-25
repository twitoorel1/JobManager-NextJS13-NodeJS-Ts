'use client';
import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { ResetPasswordInputs } from '@/types/global';
import { ThunkDispatch } from 'redux-thunk';
import { AnyAction } from 'redux';
import { useDispatch } from 'react-redux';
import { resetPasswordByResetToken } from '../redux/authSlice';

import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import ResetPasswordValidation from '../validations/ResetPasswordValidation';
import { useAuthContext } from '@/context/AuthenticationContext';

import Image from 'next/image';
import Input from '@/components/common/Input';
import Link from '@/components/common/Link';
import Button from '@/components/common/Button';

const ResetPasswordForm = () => {
	const { isLoading, isSending } = useAuthContext();
	const router = useRouter();
	const {
		register,
		handleSubmit,
		formState: { errors, isSubmitSuccessful }
	} = useForm<ResetPasswordInputs>({
		resolver: yupResolver(ResetPasswordValidation),
		defaultValues: {
			password: ''
		},
		mode: 'onBlur',
		reValidateMode: 'onChange'
	});
	const dispatch: ThunkDispatch<{}, {}, AnyAction> = useDispatch();

	const onSubmitResetPassword = async (data: ResetPasswordInputs) => {
		try {
			const resetPasswordFunction = await dispatch(resetPasswordByResetToken(data.password));
			setTimeout(() => {
				if (resetPasswordFunction.meta.requestStatus === 'fulfilled') {
					router.push('/login');
				}
			}, 2000);
		} catch (error: any) {
			console.log(error.message);
		}
	};

	return (
		<form onSubmit={handleSubmit(onSubmitResetPassword) as any}>
			<h2 className="my-10 text-2xl font-bold text-center lg:text-3xl">שחזור סיסמה</h2>

			<Input id="passwordInputResetPassword" type="password" placeholder="סיסמה חדשה" register={{ ...register('password') }} />
			{errors.password && <span className="mx-5">{errors.password.message}</span>}

			{isLoading ? (
				<Button className="flex items-center justify-evenly">
					<span>אנא המתן....</span>
					<Image src="/loading/loading.svg" alt="Loading" width={30} height={30} />
				</Button>
			) : (
				<Button label="עדכון סיסמה" />
			)}

			{isSubmitSuccessful && isSending && (
				<div className="text-center">
					<span className="font-semibold text-center text-md">הסיסמה אופסה בהצלחה</span>
				</div>
			)}
		</form>
	);
};

export default ResetPasswordForm;
