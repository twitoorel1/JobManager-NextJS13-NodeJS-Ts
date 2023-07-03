import React from 'react';
import { CreateCandidateInputs, RootState } from '../../../types/global';
import { ThunkDispatch } from 'redux-thunk';
import { AnyAction } from 'redux';
import { useDispatch, useSelector } from 'react-redux';
// Slice Here

import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import CreateCandidateValidationSchema from '../validations/CreateCandidateValidationSchema';

import Image from 'next/image';
import Input from '@/components/common/Input';
import Button from '@/components/common/Button';

const CreateCandidateForm = () => {
	return (
		<form>
			<div className="flex flex-col gap-3 mb-3 sm:flex-row">
				<div className="w-full sm:w-1/2">
					<Input type="text" showLabel label="שם הלקוח" />
				</div>
				<div className="w-full sm:w-1/2">
					<Input type="text" showLabel label='ת"ז' />
				</div>
			</div>

			<div className="flex flex-col gap-3 mb-3 sm:flex-row">
				<div className="w-full sm:w-1/2">
					<Input type="text" showLabel label="אימייל" required={false} />
				</div>
				<div className="w-full sm:w-1/2">
					<Input type="text" showLabel label="פלאפון" />
				</div>
			</div>

			<div className="mb-[1.375rem]">
				<Input type="text" showLabel label="עיר" />
			</div>

			<div className="flex flex-col gap-3 mb-3 sm:flex-row">
				<div className="w-full sm:w-1/2">
					<Input type="text" showLabel label="רחוב" />
				</div>
				<div className="w-full sm:w-1/2">
					<Input type="text" showLabel label="מיקוד" />
				</div>
			</div>

			<div className="flex flex-col gap-3 mb-3 sm:flex-row">
				<div className="w-full sm:w-1/2">
					<Input type="number" showLabel label="גיל" />
				</div>
				<div className="w-full sm:w-1/2">
					<Input type="text" showLabel label="מגדר" />
				</div>
			</div>

			<Button label="צור מעומד" className="rounded-md" />
		</form>
	);
};

export default CreateCandidateForm;
