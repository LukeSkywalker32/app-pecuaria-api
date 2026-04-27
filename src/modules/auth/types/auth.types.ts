/**
 * Login Request
 * What the user sends when logging in
 */
export interface LoginRequest {
   farmId: string;
   username: string;
   password: string;
}

/**
 * Refresh Token Request
 * What the user sends to renew token
 */
export interface RefreshTokenRequest {
   refreshToken: string;
}

/**
 * Forgot Password Request
 * First stage: send email
 */
export interface ForgotPasswordRequest {
   farmId: string;
   email: string;
}
/**
 * Confirm Reset Request
 * Second stage: confirm code + new password
 */
export interface ConfirmResetRequest {
   farmId: string;
   email: string;
   code: string;
   newPassword: string;
}

/**
 * Successful Authentication Response
 * What the backend returns after login
 */
export interface AuthenticationResponse {
   accessToken: string;
   refreshToken: string;
   userId: string;
   username: string;
   role: "admin" | "owner" | "farmmanager" | "veterinarian";
   expiresIn: string;
}

/**
 * User Data extracted from JWT
 * What is inside the token
 */
export interface UserTokenData {
   userId: string;
   farmId: string;
   username: string;
   email: string;
   role: "admin" | "owner" | "farmmanager" | "veterinarian";
   permissions: string[];
}
