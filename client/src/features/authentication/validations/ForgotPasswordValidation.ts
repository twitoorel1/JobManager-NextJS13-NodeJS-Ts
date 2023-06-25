import * as Yup from 'yup';

const ForgotPasswordValidation = Yup.object().shape({
	email: Yup.string().email().required()
});

export default ForgotPasswordValidation;
