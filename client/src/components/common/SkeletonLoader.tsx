import { FC } from 'react';
import { Skeleton } from 'antd';

type SkeletonLoaderProps = {
	isLoading?: boolean;
	amount?: number;
};

const SkeletonLoader: FC<SkeletonLoaderProps> = ({ isLoading, amount = 1 }) => {
	const skeletons = [];
	for (let i = 0; i < amount; i++) {
		skeletons.push(<Skeleton key={i} loading={isLoading} active paragraph={{ rows: 4 }} avatar />);
	}

	return <>{skeletons}</>;
};

export default SkeletonLoader;
