import { sql } from '../db';
import {IUserRepository} from "../../01-domain/repositories/example";
import {User} from "../../01-domain/entities/example";
import {UserRow} from "../db/type";

export class PostgresUserRepository implements IUserRepository {
    async save(user: User): Promise<void> {
        await sql`
      INSERT INTO users (id, email, password_hash, created_at)
      VALUES (${user.id}, ${user.email}, ${user.passwordHash}, ${user.createdAt})
    `;
    }

    async findByEmail(email: string): Promise<User | null> {
        const rows = await sql<UserRow[]>`
      SELECT * FROM users WHERE email = ${email} LIMIT 1
    `;

        if (rows.length === 0) return null;

        const row = rows[0];
        return new User(row.id, row.email, row.password_hash, row.created_at);
    }

    async findById(id: string): Promise<User | null> {
        const rows = await sql<UserRow[]>`
      SELECT * FROM users WHERE id = ${id} LIMIT 1
    `;

        if (rows.length === 0) return null;

        const row = rows[0];
        return new User(row.id, row.email, row.password_hash, row.created_at);
    }
}