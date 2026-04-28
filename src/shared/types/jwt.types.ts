export interface JwtPayload {
   userId: string;
   farmId: string;
   username: string;
   email: string;
   role: "admin" | "owner" | "farmmanager" | "veterinarian";
   iat?: number;
   exp?: number;
}

export interface TokenResponse {
   accessToken: string;
   refreshToken: string;
   expiresIn: string;
}
