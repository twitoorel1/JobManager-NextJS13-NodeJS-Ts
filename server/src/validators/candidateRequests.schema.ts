import * as yup from 'yup';

const candidateRequestsSchema = yup.object().shape({
	idCandidate: yup.string(),
	fullName: yup.string().required('fullName is required'),
	IdNumber: yup.number().required('IdNumber is required'),
	email: yup.string(),
	phone: yup.string().required('phone is required'),
	createdCandidate: yup.string(),
	address: yup.object().shape({
		city: yup.string(),
		street: yup.string(),
		zipCode: yup.string()
	}),
	age: yup.number().required('age is required').min(1, 'age must be at least 1').max(120, 'age must be at most 120'),
	gender: yup.string().required('gender is required'),
	status: yup.string()
});

export { candidateRequestsSchema };
