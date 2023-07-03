import * as Yup from 'yup';

const CreateJobValidationSchema = Yup.object().shape({
	title: Yup.string().required('title is required'),
	category: Yup.string().required('category is required'),
	type: Yup.string().required('type is required'),
	description: Yup.string().required('description is required'),
	salaryPrice: Yup.number().required('salaryPrice is required'),
	salaryType: Yup.string().required('salaryType is required'),
	branch: Yup.string().required('branch is required'),
	city: Yup.string().required('city is required'),
	standards: Yup.number().required('standards is required')
});

export default CreateJobValidationSchema;
