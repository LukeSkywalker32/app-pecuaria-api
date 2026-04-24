export interface JwtPayload {
   userId: string;
   farmId: string;
   fullName: string;
   role: "admin" | "owner" | "farmmanager" | "veterinarian";
   permissions: string[];
   iat?: number;
   exp?: number;
}

export interface TokenResponse {
   accessToken: string;
   refreshToken: string;
   expiresIn: string;
}
