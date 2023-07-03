import * as Yup from 'yup';

const CreateClientValidationSchema = Yup.object().shape({
	fullName: Yup.string().required('Full Name is required'),
	bnNumber: Yup.string().required('BN Number is required'),
	email: Yup.string().email().required('Email is required'),
	phone: Yup.string().required('Phone Number is required'),
	city: Yup.string().required('City is required'),
	street: Yup.string().required('Street is required'),
	zipCode: Yup.string().required('Zip Code is required')
});

export default CreateClientValidationSchema;
