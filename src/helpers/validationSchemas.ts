import * as yup from 'yup';

export const registerSchema = yup.object({
  fullname: yup.string().required().min(2, 'Username is required'),
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

export const loginSchema = yup.object({
  email: yup
    .string()
    .required('email is required')
    .email('Please enter a valid email address'),
  password: yup
    .string()
    .required()
    .min(2, 'Password must be at least 2 characters long'),
});
