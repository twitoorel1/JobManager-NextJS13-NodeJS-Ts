import { FC, ReactNode } from 'react';
import NextLink from 'next/link';

type linkProps = {
	children?: ReactNode;
	label?: string;
	href: string;
	className?: string;
};

const Link: FC<linkProps> = ({ children, label, href, className }) => {
	return (
		<NextLink className={`${className} text-[#1f76c2]`} href={href}>
			{label}
			{children}
		</NextLink>
	);
};

export default Link;
