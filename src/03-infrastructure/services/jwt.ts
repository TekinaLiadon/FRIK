import {env} from "../config/env";
import {ITokenService} from "../../02-application/services/token";
import jwt from 'jsonwebtoken';
export class JwtService implements ITokenService {
    generate(payload: Record<string, any>): string {
        return jwt.sign(payload, env.JWT_SECRET, { expiresIn: '7d' });
    }

    verify(token: string): Record<string, any> | null {
        try {
            return jwt.verify(token, env.JWT_SECRET) as Record<string, any>;
        } catch {
            return null;
        }
    }
}