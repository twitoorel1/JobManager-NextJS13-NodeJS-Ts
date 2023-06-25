'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { FormLoginInputs } from '@/types/global';
import { ThunkDispatch } from 'redux-thunk';
import { AnyAction } from 'redux';
import { useDispatch } from 'react-redux';
import { loginByPayload } from '../redux/authSlice';

import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import LoginValidation from '../validations/LoginValidation';
import { useAuthContext } from '@/context/AuthenticationContext';

import Image from 'next/image';
import Input from '@/components/common/Input';
import Link from '@/components/common/Link';
import Button from '@/components/common/Button';

const LoginForm = () => {
	const { isLoading, isSending } = useAuthContext();
	const router = useRouter();
	const {
		register,
		handleSubmit,
		formState: { errors, isSubmitSuccessful }
	} = useForm<FormLoginInputs>({
		resolver: yupResolver(LoginValidation),
		defaultValues: {
			username: '',
			password: ''
		},
		mode: 'onBlur',
		reValidateMode: 'onChange'
	});
	const dispatch: ThunkDispatch<{}, {}, AnyAction> = useDispatch();

	const onSubmitLogin = async (data: FormLoginInputs) => {
		try {
			const loginFunction = await dispatch(loginByPayload(data));
			setTimeout(() => {
				if (loginFunction.meta.requestStatus === 'fulfilled') {
					router.push('/');
				}
			}, 2000);
		} catch (error: any) {
			console.log(error.message);
		}
	};

	return (
		<form onSubmit={handleSubmit(onSubmitLogin) as any}>
			<h2 className="my-10 text-2xl font-bold text-center lg:text-3xl">התחברות</h2>
			<Input id="loginUsernameInput" type="text" placeholder="שם משתמש" register={{ ...register('username') }} />
			{errors.username && <span className="mx-5">{errors.username?.message}</span>}

			<Input id="loginPasswordInput" type="password" placeholder="סיסמה" register={{ ...register('password') }} />
			{errors.password && <span className="mx-5">{errors.password?.message}</span>}

			<div className="my-5">
				<Link className="my-5" href="/forgotPassword" label="שכחת את הסיסמא?" />
			</div>

			{isLoading ? (
				<Button className="flex items-center rounded-md justify-evenly">
					<span>אנא המתן....</span>
					<Image src="/loading/loading.svg" alt="Loading" width={30} height={30} />
				</Button>
			) : (
				<Button label="התחבר" className="rounded-md" />
			)}

			{isSubmitSuccessful && isSending && (
				<div className="text-center">
					<span className="font-semibold text-center text-md">התחברת בהצלחה</span>
				</div>
			)}
		</form>
	);
};

export default LoginForm;
