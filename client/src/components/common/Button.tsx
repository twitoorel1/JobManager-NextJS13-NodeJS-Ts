import React, { FC, ReactNode } from 'react';

type buttonProps = {
	label?: string | number;
	type?: 'submit' | 'reset' | 'button' | undefined;
	variant?: string;
	children?: ReactNode;
	className?: string;
	fontSize?: string;
	onClick?: any;
	htmlType?: any;
	disabled?: boolean;
};

const Button: FC<buttonProps> = ({
	type = 'submit',
	children,
	className,
	label = '',
	onClick,
	fontSize = 'text-lg',
	variant = 'primary',
	htmlType,
	disabled = false
}) => {
	switch (fontSize) {
		case 'xs':
			fontSize = 'text-xs';
			break;
		case 'sm':
			fontSize = 'text-sm';
			break;
		case 'md':
			fontSize = 'text-md';
			break;
		case 'lg':
			fontSize = 'text-lg';
			break;
		case 'xl':
			fontSize = 'text-xl';
			break;
	}

	let fontColor = 'text-white';
	let border;
	let hoverColor;
	const width = variant === 'default' ? 'w-fit' : 'w-full';
	switch (variant) {
		case 'primary':
			variant = 'bg-[#0073EA]';
			hoverColor = 'hover:bg-[#0060b9]';
			break;
		case 'default':
			variant = 'bg-white';
			fontColor = 'text-slate-800';
			border = 'border border-[#c5c7d0]';
			hoverColor = 'hover:bg-slate-300/10';
			break;
		case 'secondary':
			variant = 'bg-slate-600';
			hoverColor = 'hover:bg-slate-700';
			break;
		case 'success':
			variant = 'bg-green-600';
			hoverColor = 'hover:bg-green-700';
			break;
		case 'error':
			variant = 'bg-red-600';
			hoverColor = 'hover:bg-red-700';
			break;
		case 'outlined':
			variant = 'bg-transparent';
			fontColor = 'text-slate-800';
			border = 'border-0';
			break;

		default:
			variant = 'bg-[#0052CC]';
	}

	return (
		<button
			disabled={disabled}
			onClick={onClick}
			type={type}
			className={`flex justify-center place-items-center mx-auto py-2.5 px-2 my-2 ${variant} ${width} ${hoverColor} ${fontSize} ${fontColor} ${border} ${className}`}
		>
			<span>{label}</span>
			{children}
		</button>
	);
};

export default Button;
