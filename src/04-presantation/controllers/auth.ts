import {RegisterUserUseCase} from "../../02-application/use-cases/registration";
import {UserAlreadyExistsError} from "../../01-domain/errors/example";


export class AuthController {
    constructor(
        private registerUserUseCase: RegisterUserUseCase,
        private loginUserUseCase: LoginUserUseCase // TODO
    ) {}

    async register({ body, set }: any) {
        try {
            const result = await this.registerUserUseCase.execute({
                email: body.email,
                password: body.password
            });

            set.status = 201;
            return result;
        } catch (error) {
            if (error instanceof UserAlreadyExistsError) {
                set.status = 409;
                return { error: error.message };
            }
            set.status = 500;
            return { error: 'Internal Server Error' };
        }
    }

    async login({ body, set }: any) {
        try {
            const result = await this.loginUserUseCase.execute({
                email: body.email,
                password: body.password
            });

            set.status = 200;
            return result;
        } catch (error) {
            if (error instanceof InvalidCredentialsError) {
                set.status = 401;
                return { error: error.message };
            }
            set.status = 500;
            return { error: 'Internal Server Error' };
        }
    }
}