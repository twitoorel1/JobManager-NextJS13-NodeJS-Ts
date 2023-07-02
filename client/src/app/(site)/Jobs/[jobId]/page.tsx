import React from 'react';

interface IJobViewProps {
	params: {
		jobId: string;
	};
}

export function generateMetadata(props: IJobViewProps) {
	return {
		title: `Job View | ${props.params.jobId}`
	};
}

const OneJob = (props: IJobViewProps) => {
	const { jobId } = props.params;

	return <div>One Job</div>;
};

export default OneJob;
