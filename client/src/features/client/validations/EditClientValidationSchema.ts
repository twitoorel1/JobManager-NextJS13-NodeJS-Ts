import * as Yup from 'yup';

const EditClientValidationSchema = Yup.object().shape({
	fullName: Yup.string(),
	bnNumber: Yup.string(),
	email: Yup.string().email(),
	phone: Yup.string(),
	city: Yup.string(),
	street: Yup.string(),
	zipCode: Yup.string()
});

export default EditClientValidationSchema;
