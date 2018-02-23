import isEmail from 'validator/lib/isEmail';

export const mustBeEmail = value => (typeof value === 'string' && isEmail(value) ? undefined : 'Invalid Email');

export const passwordLength = value =>
    value && value.length >= 8 ? undefined : 'Minimum password length is 8 characters';

export const passwordCharacters = value =>
    /^[A-Za-z0-9]*$/.test(value) ? undefined : 'Only letters and numbers are allowed';

export const titleLength = value => (value && value.length <= 50 ? undefined : 'Too Long');

export const required = value => (value ? undefined : 'Required');
