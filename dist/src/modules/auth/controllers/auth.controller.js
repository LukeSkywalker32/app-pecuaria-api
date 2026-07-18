// ========================================
// AUTHENTICATION CONTROLLER
// ========================================
import authService from "../services/auth.service";
class AuthController {
    /**
     * Login exclusivo do admin — sem seleção de fazenda
     * POST /api/auth/admin-login
     */
    async adminLogin(req, res, next) {
        try {
            const { username, password } = req.body;
            const response = await authService.adminLogin({ username, password });
            res.status(200).json(response);
        }
        catch (error) {
            next(error);
        }
    }
    /**
     * Performs user login
     * POST /api/auth/login
     */
    async login(req, res, next) {
        try {
            const { farmId, username, password } = req.body;
            const response = await authService.login({
                farmId,
                username,
                password,
            });
            res.status(200).json(response);
        }
        catch (error) {
            next(error);
        }
    }
    /**
     * Renews access token
     * POST /api/auth/renew-token
     */
    async renewToken(req, res, next) {
        try {
            const { refreshToken } = req.body;
            if (!refreshToken) {
                return res.status(400).json({
                    error: "Refresh token is required",
                });
            }
            const response = await authService.renewToken(refreshToken);
            res.status(200).json(response);
        }
        catch (error) {
            next(error);
        }
    }
    /**
     * Forgot password
     * POST /api/auth/forgot-password
     */
    async forgotPassword(req, res, next) {
        try {
            const { farmId, email } = req.body;
            await authService.forgotPassword({ farmId, email });
            res.status(200).json({
                message: "If the email exists in our system, you will receive a reset code",
            });
        }
        catch (error) {
            next(error);
        }
    }
    /**
     * Confirm password reset
     * POST /api/auth/confirm-reset
     */
    async confirmReset(req, res, next) {
        try {
            const { farmId, email, code, newPassword } = req.body;
            await authService.confirmReset({
                farmId,
                email,
                code,
                newPassword,
            });
            res.status(200).json({
                message: "Password reset successfully",
            });
        }
        catch (error) {
            next(error);
        }
    }
}
export default new AuthController();
//# sourceMappingURL=auth.controller.js.map