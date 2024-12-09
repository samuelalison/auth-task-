

export interface ProviderConfig {
    url: string;
    client_id: string;
    client_secret: string;
    redirect_uri: string;
    scope?: string;
    response_type: 'code' | 'token';
    grant_type: 'authorization_code' | 'client_credentials';
}


export interface AuthResponse {
    status: string;
    message: string;
    timestamp?: string;
}
