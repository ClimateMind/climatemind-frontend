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
      'Invalid Password. Password must be at least 8 characters and containt one number or one special character'
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
  friend: yup
    .string()
    .required('Please enter your friends name')
    .min(2, 'Name must be at least 2 characters')
    .max(50, 'Name must be at most 50 characters'),
});


export const updatePasswordSchema = yup.object({
  currentPassword: yup.string().required('Please enter your current password'),
  newPassword: yup.string().required('Please enter your new password'),
  confirmPassword: yup.string().required('Please confirm the new password'),
});

export const updateEmailSchema = yup.object({
  newEmail: yup
  .string()
  .required('Please enter new email')
  .email('Please enter a valid email address'),
  confirmNewEmail: yup
  .string()
  .required('Please confirm the new email')
  .email('Please enter a valid email address'),
  password: yup.string().required('Please enter your password'),
});
