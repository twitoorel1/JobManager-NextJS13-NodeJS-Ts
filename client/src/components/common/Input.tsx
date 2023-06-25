import { FC } from 'react';

type InputProps = {
	label?: string;
	type?: string;
	register?: any;
	id?: string;
	inputClassName?: string;
	labelClassName?: string;
	placeholder?: string | [];
	disabled?: boolean;
	required?: boolean;
	showLabel?: boolean;
	defaultValue?: string | [];
};

const Input: FC<InputProps> = ({
	register,
	labelClassName,
	disabled,
	label = 'label',
	showLabel = false,
	type = 'text',
	id = 'input',
	inputClassName,
	placeholder = '',
	defaultValue = '',
	required = true
}) => {
	return (
		<div className="my-4">
			{showLabel && (
				<label htmlFor={id} className={`block mb-2 text-sm min-w-fit font-medium text-gray-900 dark:text-white ${labelClassName}`}>
					{label}
				</label>
			)}

			<input
				autoComplete="false"
				autoCorrect="false"
				{...register}
				type={type}
				id={id}
				disabled={disabled}
				placeholder={placeholder}
				defaultValue={defaultValue}
				required={required}
				className={`block w-full p-3 text-gray-900 text-md rounded-md bg-white border border-borderColor-secondary placeholder-slate-400 focus:border-sky-500 focus:ring-1 focus:outline-none focus:ring-[##66afe9] ${
					disabled && 'text-[#555555] bg-gray-300'
				} ${inputClassName}`}
			/>
		</div>
	);
};

export default Input;
