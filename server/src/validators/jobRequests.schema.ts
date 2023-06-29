import * as yup from 'yup';

const jobRequestSchema = yup.object().shape({
	idJob: yup.string(),
	title: yup.string().required('title is required'),
	category: yup.string().required('category is required'),
	type: yup.string().required('type is required'),
	description: yup.string().required('description is required'),
	company: yup.string(),
	createdJob: yup.string(),
	salaryPrice: yup.number().required('salaryPrice is required'),
	salaryType: yup.string().required('salaryType is required'),
	branch: yup.string(),
	city: yup.string(),
	standards: yup.number().required('standards is required').min(1),
	status: yup.string()
});

export { jobRequestSchema };
