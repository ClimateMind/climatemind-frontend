import * as yup from 'yup';

export const passwordRegex =
  /^(?=.*[a-zA-Z])(?=.*[\d!"#$£%&'()*+,-.:;<=>?@[\]^_`{|}~]).{8,128}$/;

export const registerSchema = yup.object({
  firstname: yup
    .string()
    .required()
    .min(2, 'Name must be at least 2 characters')
    .max(50, 'Name must be at most 50 characters'),
  lastname: yup
    .string()
    .required()
    .min(2, 'Name must be at least 2 characters')
    .max(50, 'Name must be at most 50 characters'),
  email: yup.string().required().email('Invalid email address'),
  password: yup
    .string()
    .required()
    .matches(
      passwordRegex,
      'Password must be between 8-20 characters and containt at least one uppercase letter, one lowercase letter, one number and one special character'
    ),
  confirmPassword: yup.string().required('Please confirm you password'),
});

export const loginSchema = yup.object({
  email: yup
    .string()
    .required('Email is required')
    .email('Please enter a valid email address'),
  password: yup.string().required('Please enter your password'),
});

export const generateLinkSchema = yup.object({
  friend: yup.string().required('Please enter your friends name'),
});
