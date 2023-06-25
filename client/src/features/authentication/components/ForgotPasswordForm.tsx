'use client';

import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { ForgotPasswordInputs } from '@/types/global';
import { ThunkDispatch } from 'redux-thunk';
import { AnyAction } from 'redux';
import { useDispatch } from 'react-redux';
import { forgotPasswordByEmail } from '../redux/authSlice';

import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import ForgotPasswordValidation from '../validations/ForgotPasswordValidation';
import { useAuthContext } from '@/context/AuthenticationContext';

import Image from 'next/image';
import Input from '@/components/common/Input';
import Link from '@/components/common/Link';
import Button from '@/components/common/Button';

const ForgotPasswordForm = () => {
	const { isLoading, isSending } = useAuthContext();
	const router = useRouter();
	const {
		register,
		handleSubmit,
		formState: { errors, isSubmitSuccessful }
	} = useForm<ForgotPasswordInputs>({
		resolver: yupResolver(ForgotPasswordValidation),
		defaultValues: {
			email: ''
		},
		mode: 'onBlur',
		reValidateMode: 'onChange'
	});
	const dispatch: ThunkDispatch<{}, {}, AnyAction> = useDispatch();

	const onSubmitForgotPassword = async (data: ForgotPasswordInputs) => {
		try {
			const forgotPassword = await dispatch(forgotPasswordByEmail(data.email));
			setTimeout(() => {
				if (forgotPassword.meta.requestStatus === 'fulfilled') {
					router.push('/login');
				}
			}, 2000);
		} catch (error: any) {
			console.log(error.message);
		}
	};

	return (
		<form onSubmit={handleSubmit(onSubmitForgotPassword) as any}>
			<h2 className="my-10 text-2xl font-bold text-center lg:text-3xl">שחזור סיסמה</h2>

			<Input id="emailInputForgotPassword" type="email" placeholder="אימייל" register={{ ...register('email') }} />

			{isLoading ? (
				<Button className="flex items-center justify-evenly">
					<span>אנא המתן....</span>
					<Image src="/loading/loading.svg" alt="Loading" width={30} height={30} />
				</Button>
			) : (
				<Button label="שחזור סיסמה" />
			)}

			{isSubmitSuccessful && isSending && (
				<div className="text-center">
					<span className="font-semibold text-center text-md">נשלח לך אימייל לאיפוס הסיסמה</span>
				</div>
			)}
		</form>
	);
};

export default ForgotPasswordForm;
