import { Elysia, t } from 'elysia';
import {AuthController} from "../controllers/auth";

export const createAuthRoutes = (authController: AuthController) => {
    return new Elysia({ prefix: '/auth' })
        .post('/register', ({ body, set }) => authController.register({ body, set }), {
            body: t.Object({
                email: t.String({ format: 'email' }),
                password: t.String({ minLength: 6 })
            })
        })
        .post('/login', ({ body, set }) => authController.login({ body, set }), {
            body: t.Object({
                email: t.String(),
                password: t.String()
            })
        });
};