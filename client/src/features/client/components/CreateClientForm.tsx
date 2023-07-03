import React from 'react';
import { CreateClientInputs, RootState } from '../../../types/global';
import { ThunkDispatch } from 'redux-thunk';
import { AnyAction } from 'redux';
import { useDispatch, useSelector } from 'react-redux';
// Slice Here

import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import CreateClientValidationSchema from '../validations/CreateClientValidationSchema';

import Image from 'next/image';
import Input from '@/components/common/Input';
import Button from '@/components/common/Button';

const CreateClientForm = () => {
	return (
		<form>
			<div className="flex flex-col gap-3 mb-3 sm:flex-row">
				<div className="w-full sm:w-1/2">
					<Input type="text" showLabel label="שם הלקוח" />
				</div>
				<div className="w-full sm:w-1/2">
					<Input type="text" showLabel label='ח"פ' />
				</div>
			</div>

			<div className="flex flex-col gap-3 mb-3 sm:flex-row">
				<div className="w-full sm:w-1/2">
					<Input type="text" showLabel label="אימייל" />
				</div>
				<div className="w-full sm:w-1/2">
					<Input type="text" showLabel label="פלאפון" />
				</div>
			</div>

			<div className="mb-[1.375rem]">
				<Input type="text" showLabel label="עיר" required={false} />
			</div>

			<div className="flex flex-col gap-3 mb-3 sm:flex-row">
				<div className="w-full sm:w-1/2">
					<Input type="text" showLabel label="רחוב" required={false} />
				</div>
				<div className="w-full sm:w-1/2">
					<Input type="text" showLabel label="מיקוד" required={false} />
				</div>
			</div>

			<Button label="צור לקוח" className="rounded-md" />
		</form>
	);
};

export default CreateClientForm;
