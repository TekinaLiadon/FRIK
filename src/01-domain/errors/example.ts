export class DomainError extends Error {
    constructor(message: string) {
        super(message);
        this.name = this.constructor.name;
    }
}

export class UserAlreadyExistsError extends DomainError {
    constructor(email: string) {
        super(`User with email ${email} already exists`);
    }
}

export class InvalidCredentialsError extends DomainError {
    constructor() {
        super('Invalid email or password');
    }
}

export class ResourceNotFoundError extends DomainError {
    constructor(resource: string) {
        super(`${resource} not found`);
    }
}