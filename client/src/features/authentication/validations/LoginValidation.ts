import * as Yup from 'yup';
import { passwordRegex } from '@/constants/regex.constant';

const LoginValidationSchema = Yup.object().shape({
	username: Yup.string().required('שדה שם משתמש זה חובה'),
	password: Yup.string().required('שדה סיסמה זה חובה').matches(passwordRegex, 'סיסמה לא תקינה')
});

export default LoginValidationSchema;
