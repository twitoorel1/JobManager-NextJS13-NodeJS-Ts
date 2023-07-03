import React from 'react';
import { CreateJobInputs, RootState } from '../../../types/global';
import { ThunkDispatch } from 'redux-thunk';
import { AnyAction } from 'redux';
import { useDispatch, useSelector } from 'react-redux';
// Slice Here

import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import CreateJobValidationSchema from '../validations/CreateJobValidationSchema';

import Image from 'next/image';
import Input from '@/components/common/Input';
import Button from '@/components/common/Button';

const CreateJobForm = () => {
	return (
		<form>
			<div className="flex flex-col gap-3 mb-3 sm:flex-row">
				<div className="w-full sm:w-1/2">
					<Input type="text" showLabel label="כותרת" />
				</div>
				<div className="w-full sm:w-1/2">
					<Input type="text" showLabel label="קטגוריה" />
				</div>
			</div>

			<div className="flex flex-col gap-3 mb-3 sm:flex-row">
				<div className="w-full sm:w-1/2">
					<Input type="text" showLabel label="סוג" />
				</div>
				<div className="w-full sm:w-1/2">
					<Input type="text" showLabel label="תיאור המשרה" />
				</div>
			</div>

			<div className="flex flex-col gap-3 mb-3 sm:flex-row">
				<div className="w-full sm:w-1/2">
					<Input type="number" showLabel label="סכום משכורת" />
				</div>
				<div className="w-full sm:w-1/2">
					<Input type="text" showLabel label="משכורת לפי?" />
				</div>
			</div>

			<div className="flex flex-col gap-3 mb-3 sm:flex-row">
				<div className="w-full sm:w-1/2">
					<Input type="text" showLabel label="סניף" />
				</div>
				<div className="w-full sm:w-1/2">
					<Input type="text" showLabel label="עיר" />
				</div>
			</div>

			<div className="mb-[1.375rem]">
				<Input type="text" showLabel label="תקנים זמינים" />
			</div>

			<Button label="צור לקוח" className="rounded-md" />
		</form>
	);
};

export default CreateJobForm;
