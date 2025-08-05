import * as yup from 'yup';

const nameRegex = /^[a-zA-Z\s-]+$/;
const phMobileRegex = /^(09\d{9}|\+639\d{9})$/;

export const stepOneSchema = yup.object({
  first_name: yup
    .string()
    .required('First name is required')
    .max(255, 'First name must be less than 255 characters')
    .matches(nameRegex, 'First name must contain only letters, spaces, or dashes'),

  middle_name: yup
    .string()
    .transform(value => value === '' ? null : value)
    .nullable()
    .max(255, 'Middle name must be less than 255 characters')
    .matches(nameRegex, 'Middle name must contain only letters, spaces, or dashes'),

  surname: yup
    .string()
    .required('Surname is required')
    .max(255, 'Surname must be less than 255 characters')
    .matches(nameRegex, 'Surname must contain only letters, spaces, or dashes'),

  email: yup
    .string()
    .required('Email is required')
    .email('Must be a valid email')
    .max(255, 'Email must be less than 255 characters'),

  mobile_number: yup
    .string()
    .required('Mobile number is required')
    .max(255, 'Mobile number must be less than 255 characters')
    .matches(phMobileRegex, 'Mobile number must start with 09 or +639 and be followed by 9 digits'),
});

const passwordComplexity = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z\d]).+$/;

export const stepTwoSchema = yup.object({
  username: yup
    .string()
    .required('Username is required')
    .max(255, 'Username must be less than 255 characters'),

  password: yup
    .string()
    .required('Password is required')
    .min(8, 'Password must be at least 8 characters')
    .matches(passwordComplexity, 'Password must contain uppercase, lowercase, number, and symbol'),

  password_confirmation: yup
    .string()
    .oneOf([yup.ref('password')], 'Passwords must match')
    .required('Confirm password is required'),
});
