import { Request, Response, NextFunction } from 'express';
import AuthService from './auth.service';
// import { AuthResponse } from './auth.interface';


class AuthController {
    private readonly authService: typeof AuthService;

    constructor() {
        this.authService = AuthService;
        this.getAuth = this.getAuth.bind(this);
    }

    public async getAuth(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            await this.authService.setAuth(req, res, next);
        } catch (error) {
            next(error);
        }
    }
}

export default new AuthController();

