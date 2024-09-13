export interface SignInFormData {
    email: string;
    password: string;
    remember: boolean;
}

export interface SignUpFormData {
    firstname: string;
    lastname: string;
    email: string;
    password: string;
    confirmedPassword: string;
    acceptPolicy: boolean;
}
