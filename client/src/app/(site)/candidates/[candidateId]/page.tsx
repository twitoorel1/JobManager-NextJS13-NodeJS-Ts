import React from 'react';

interface ICandidateViewProps {
	params: {
		candidateId: string;
	};
}

export function generateMetadata(props: ICandidateViewProps) {
	return {
		title: `Candidate View | ${props.params.candidateId}`
	};
}

const CandidateId = (props: ICandidateViewProps) => {
	const { candidateId } = props.params;

	return <div>One Candidate</div>;
};

export default CandidateId;
