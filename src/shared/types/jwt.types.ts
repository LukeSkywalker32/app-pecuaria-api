export interface JwtPayload {
	userId: string;
	herdId: string;
	nomeCompleto: string;
	role: "admin" | "owner" | "farmmanager" | "veterinario";
	permissoes: string[];
	iat?: number;
	exp?: number;
}

export interface TokenResponse {
	accessToken: string;
	refreshToken: string;
	expiresIn: string;
}
