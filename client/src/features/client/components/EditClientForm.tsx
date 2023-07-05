'use client';
import React, { useEffect, useState } from 'react';
import { EditClientInputs, RootState } from '../../../types/global';
import { ThunkDispatch } from 'redux-thunk';
import { AnyAction } from 'redux';
import { useDispatch, useSelector } from 'react-redux';
// Slice Here

import { SubmitHandler, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import EditClientValidationSchema from '../validations/EditClientValidationSchema';

import Image from 'next/image';
import Input from '@/components/common/Input';
import Button from '@/components/common/Button';
import { findOneCompanyById, editClientWithIdClient } from '../redux/clientSlice';

const EditClientForm = (props: any) => {
	const [clientOne, setClientOne] = useState<{ company: any | null }>({ company: null });
	const dispatch: ThunkDispatch<{}, {}, AnyAction> = useDispatch();

	useEffect(() => {
		dispatch(findOneCompanyById(props.clientId))
			.then(data => setClientOne(data.payload))
			.catch(err => console.log(err));
	}, [dispatch]);

	const {
		register,
		handleSubmit,
		formState: { errors, isSubmitSuccessful }
	} = useForm<EditClientInputs>({
		defaultValues: {
			name: clientOne.company?.name,
			bnNumber: clientOne.company?.bnNumber
			// email: clientOne.company?.email,
			// phone: clientOne.company?.phone,
			// address: {
			// 	street: clientOne.company?.address?.street,
			// 	city: clientOne.company?.address?.city,
			// 	zipCode: clientOne.company?.address?.zipCode
			// }
		},
		mode: 'onBlur',
		reValidateMode: 'onChange'
	});

	const onSubmitEditClient: SubmitHandler<EditClientInputs> = async data => {
		// event?.preventDefault();
		try {
			const editClient = await dispatch(editClientWithIdClient({ clientId: props.clientId.toString(), formValue: data }));
			console.log(editClient);
		} catch (error: any) {
			console.log(error.message);
		}
	};

	return (
		<form onSubmit={handleSubmit(onSubmitEditClient) as any}>
			<div className="flex flex-col gap-3 mb-3 sm:flex-row">
				<div className="w-full sm:w-1/2">
					<Input
						id="editClientFullNameInput"
						type="text"
						defaultValue={clientOne.company?.name}
						placeholder={clientOne.company?.name}
						showLabel
						label="שם הלקוח"
						register={{ ...register('name') }}
					/>
				</div>
				<div className="w-full sm:w-1/2">
					<Input
						id="editClientBnNumberInput"
						type="text"
						defaultValue={clientOne.company?.bnNumber}
						placeholder={clientOne.company?.bnNumber}
						showLabel
						label='ח"פ'
						register={{ ...register('bnNumber') }}
					/>
				</div>
			</div>
			{/* 
			<div className="flex flex-col gap-3 mb-3 sm:flex-row">
				<div className="w-full sm:w-1/2">
					<Input
						id="editClientEmailInput"
						defaultValue={clientOne.company?.email}
						type="text"
						showLabel
						label="אימייל"
						register={{ ...register('email') }}
					/>
				</div>
				<div className="w-full sm:w-1/2">
					<Input
						id="editClientPhoneInput"
						defaultValue={clientOne.company?.phone}
						type="text"
						showLabel
						label="פלאפון"
						register={{ ...register('phone') }}
					/>
				</div>
			</div> */}

			{/* <div className="mb-[1.375rem]">
				<Input
					id="editClientCityInput"
					defaultValue={clientOne.company?.address?.city}
					type="text"
					showLabel
					label="עיר"
					required={false}
					register={{ ...register('address.city') }}
				/>
			</div> */}

			{/* <div className="flex flex-col gap-3 mb-3 sm:flex-row">
				<div className="w-full sm:w-1/2">
					<Input
						id="editClientStreetInput"
						defaultValue={clientOne.company?.address?.street}
						type="text"
						showLabel
						label="רחוב"
						required={false}
						register={{ ...register('address.street') }}
					/>
				</div>
				<div className="w-full sm:w-1/2">
					<Input
						id="editClientZipCodeInput"
						defaultValue={clientOne.company?.address?.zipCode}
						type="text"
						showLabel
						label="מיקוד"
						required={false}
						register={{ ...register('address.zipCode') }}
					/>
				</div>
			</div> */}

			<Button label="ערוך לקוח" className="rounded-md" />
		</form>
	);
};

export default EditClientForm;
