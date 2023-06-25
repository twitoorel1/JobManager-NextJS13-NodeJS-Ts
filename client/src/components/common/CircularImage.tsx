import Image from 'next/image';
import React, { FC } from 'react';

interface ICircularImageProps {
	href: string;
	alt: string;
}

const CircularImage: FC<ICircularImageProps> = ({ href, alt }) => {
	return (
		<div className="rounded-full overflow-hidden w-32 h-32 relative">
			<div className="absolute inset-2 flex items-center justify-center pointer-events-none">
				<Image className={`w-full h-full object-cover rounded-full`} src={href} alt={alt} width={100} height={100} />
			</div>
		</div>
	);
};

export default CircularImage;
