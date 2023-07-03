import * as Yup from 'yup';

const CreateCandidateValidationSchema = Yup.object().shape({
	fullName: Yup.string().required('Full Name is required'),
	IdNumber: Yup.string().required('BN Number is required'),
	email: Yup.string().email(),
	phone: Yup.string().required('Phone Number is required'),
	city: Yup.string().required('City is required'),
	street: Yup.string().required('Street is required'),
	zipCode: Yup.string().required('Zip Code is required'),
	age: Yup.number().required('Age is required'),
	gender: Yup.string().required('Gender is required')
});

export default CreateCandidateValidationSchema;
