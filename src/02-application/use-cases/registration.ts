import {IUserRepository} from "../../01-domain/repositories/example";
import {IPasswordService} from "../services/password";
import {ITokenService} from "../services/token";
import {AuthOutput, RegisterUserInput} from "../dto/example";
import {UserAlreadyExistsError} from "../../01-domain/errors/example";
import {User} from "../../01-domain/entities/example";

export class RegisterUserUseCase {
    constructor(
        private userRepo: IUserRepository,
        private passwordService: IPasswordService,
        private tokenService: ITokenService
    ) {}

    async execute(input: RegisterUserInput): Promise<AuthOutput> {
        const email = input.email;
        const password = input.password;
        const existingUser = await this.userRepo.findByEmail(email);
        if (existingUser) throw new UserAlreadyExistsError(email);
        
        const passwordHash = await this.passwordService.hash(password);
        const id = crypto.randomUUID();

        const newUser = new User(
            id,
            email,
            passwordHash,
            new Date()
        );

        await this.userRepo.save(newUser);

        const token = this.tokenService.generate({ sub: newUser.id });

        return {
            token,
            userId: newUser.id
        };
    }
}