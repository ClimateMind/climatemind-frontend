import * as yup from 'yup';

const validationSchema = yup.object({
  username: yup
    .string()
    .required('Username is required')
    .min(2, 'Username must be at least 2 characters long'),
  password: yup
    .string()
    .required()
    .min(2, 'Password must be at least 2 characters long'),
  confirmPassword: yup
    .string()
    .required()
    .min(2, 'Password must be at least 2 characters long'),
  email: yup
    .string()
    .email('Please enter a valid email address')
    .required('Email address is required'),
});

export default validationSchema;
