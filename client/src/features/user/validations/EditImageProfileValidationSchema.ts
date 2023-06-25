import * as Yup from 'yup';

const EditImageProfileValidationSchema = Yup.object().shape({
	imgSRC: Yup.string().required()
});

export default EditImageProfileValidationSchema;

// const schema = yup.object().shape({
// 	picture: yup
// 		.mixed()
// 		.test('required', 'You need to provide a file', value => {
// 			return value && value.length;
// 		})
// 		.test('fileSize', 'The file is too large', (value, context) => {
// 			return value && value[0] && value[0].size <= 200000;
// 		})
// 		.test('type', 'We only support jpeg', function (value) {
// 			return value && value[0] && value[0].type === 'image/jpeg';
// 		})
// });
