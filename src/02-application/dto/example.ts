export interface RegisterUserInput {
    email: string;
    password: string;
}

export interface AuthOutput {
    token: string;
    userId: string;
}