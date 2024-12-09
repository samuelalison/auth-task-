import { Request, Response, NextFunction } from 'express';
import { ProviderConfig } from './auth.interface';

type Provider = 'github' | 'gitlab' | 'google';


class AuthService {
    private readonly config: Record<Provider, ProviderConfig> = {
        github: {
            url: process.env.GITHUB_AUTH_URL || '',
            client_id: process.env.GITHUB_CLIENT_ID || '',
            client_secret: process.env.GITHUB_CLIENT_SECRET || '',
            redirect_uri: process.env.GITHUB_REDIRECT_URI || '',
            response_type: 'code',
            grant_type: 'authorization_code',
            scope: 'read:user user:email'
        },
        gitlab: {
            url: process.env.GITLAB_AUTH_URL || '',
            client_id: process.env.GITLAB_CLIENT_ID || '',
            client_secret: process.env.GITLAB_CLIENT_SECRET || '',
            redirect_uri: process.env.GITLAB_REDIRECT_URI || '',
            response_type: 'code',
            grant_type: 'authorization_code',
            scope: 'openid profile email'
        },
        google: {
            url: process.env.GOOGLE_AUTH_URL || '',
            client_id: process.env.GOOGLE_CLIENT_ID || '',
            client_secret: process.env.GOOGLE_CLIENT_SECRET || '',
            redirect_uri: process.env.GOOGLE_REDIRECT_URI || '',
            scope: 'email profile',
            response_type: 'code',
            grant_type: 'authorization_code'
        },
    };
    constructor() {
        this.setAuth = this.setAuth.bind(this);
    }
    
    public async setAuth(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const provider = req.params.provider as Provider;
            
            
            if (!this.config[provider]) {
                throw new Error(`Invalid provider: ${provider}`);
            }

            const { url, client_id, redirect_uri, scope } = this.config[provider];
            const oauthUrl = `${url}?client_id=${client_id}&redirect_uri=${encodeURIComponent(redirect_uri)}&response_type=code${scope ? `&scope=${scope}` : ''}`;

            res.redirect(oauthUrl);
        } catch (error) {
            next(error);
        }
    }
}


export default new AuthService();
