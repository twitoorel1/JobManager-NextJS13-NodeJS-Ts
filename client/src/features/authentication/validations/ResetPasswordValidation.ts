import * as Yup from 'yup';

const ResetPasswordValidation = Yup.object().shape({
	password: Yup.string().required()
});

export default ResetPasswordValidation;
