import {
	JWT_EXPIRE,
	JWT_REFRESH_EXPIRE,
	JWT_REFRESH_SECRET,
	JWT_SECRET,
} from "./env";

export const jwtConfig = {
	secret: JWT_SECRET,
	refreshSecret: JWT_REFRESH_SECRET,
	expiresIn: JWT_EXPIRE,
	refreshExpiresIn: JWT_REFRESH_EXPIRE,
};
