export interface SignInFormData {
    email: string;
    password: string;
    remember: boolean;
}

export interface SignUpFormData {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    confirmedPassword: string;
    acceptPolicy: boolean;
}
