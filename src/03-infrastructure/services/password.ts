import {IPasswordService} from "../../02-application/services/password";

export class BunPasswordService implements IPasswordService {
    async hash(plain: string): Promise<string> {
        return Bun.password.hash(plain);
    }

    async compare(plain: string, hashed: string): Promise<boolean> {
        return Bun.password.verify(plain, hashed);
    }
}