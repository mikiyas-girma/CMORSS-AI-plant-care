import { SignInFormData, SignUpFormData } from "@/types/form";

export function signupValidation(formData: SignUpFormData): {[key in keyof SignUpFormData]: string} {
    const errors: {[key in keyof SignUpFormData]: string} = {
        firstname: '',
        lastname: '',
        email: '',
        password: '',
        confirmedPassword: '',
        acceptPolicy: ''
    }

    if (formData.firstname === '') {
        errors.firstname = 'First name is required';
    }

    if (formData.lastname === '') {
        errors.lastname = 'Last name is required';
    }
  
    if (formData.email === '')
        errors.email = 'Email is required';

    if (formData.password === '') {
        errors.password = 'Password is required';
    } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(formData.password)) {
        errors.password = 'Password must contain 8 characters with at least 1 lowercase letter, 1 uppercase letter, and 1 digit';
    } else if (formData.password !== formData.confirmedPassword)
        errors.confirmedPassword = 'The passwords must be identical';

    if (!formData.acceptPolicy)
        errors.acceptPolicy = 'You must accept policy terms';

    return errors;
}

export function signinValidation(formData: SignInFormData): {[key in keyof SignInFormData]: string} {
    const errors: {[key in keyof SignInFormData]: string} = {
        email: '',
        password: '',
        remember: ''
    }

    if (formData.email === '')
        errors.email = 'Email is required';

    if (formData.password === '') {
        errors.password = 'Password is required';
    } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(formData.password)) {
        errors.password = 'Password must contain 8 characters with at least 1 lowercase letter, 1 uppercase letter, and 1 digit';
    }

    return errors;
}