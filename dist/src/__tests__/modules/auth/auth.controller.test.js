import { describe, test, expect, vi, afterEach } from "vitest";
import authController from "../../../modules/auth/controllers/auth.controller";
import authService from "../../../modules/auth/services/auth.service";
vi.mock("../../../modules/auth/services/auth.service");
const mockResponse = () => {
    const res = {};
    res.status = vi.fn().mockReturnValue(res);
    res.json = vi.fn().mockReturnValue(res);
    return res;
};
const mockNext = vi.fn();
describe("AuthController", () => {
    afterEach(() => {
        vi.clearAllMocks();
    });
    test("login - success", async () => {
        const req = { body: { farmId: "f1", username: "user", password: "pass" } };
        const res = mockResponse();
        authService.login.mockResolvedValue({ token: "abc" });
        await authController.login(req, res, mockNext);
        expect(authService.login).toHaveBeenCalledWith({ farmId: "f1", username: "user", password: "pass" });
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith({ token: "abc" });
    });
    test("login - error calls next", async () => {
        const req = { body: {} };
        const res = mockResponse();
        const error = new Error("Login failed");
        authService.login.mockRejectedValue(error);
        await authController.login(req, res, mockNext);
        expect(mockNext).toHaveBeenCalledWith(error);
    });
    test("renewToken - missing token returns 400", async () => {
        const req = { body: {} };
        const res = mockResponse();
        await authController.renewToken(req, res, mockNext);
        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.json).toHaveBeenCalledWith({ error: "Refresh token is required" });
    });
    test("renewToken - success", async () => {
        const req = { body: { refreshToken: "rt" } };
        const res = mockResponse();
        authService.renewToken.mockResolvedValue({ accessToken: "new" });
        await authController.renewToken(req, res, mockNext);
        expect(authService.renewToken).toHaveBeenCalledWith("rt");
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith({ accessToken: "new" });
    });
    test("renewToken - error calls next", async () => {
        const req = { body: { refreshToken: "rt" } };
        const res = mockResponse();
        const error = new Error("Token error");
        authService.renewToken.mockRejectedValue(error);
        await authController.renewToken(req, res, mockNext);
        expect(mockNext).toHaveBeenCalledWith(error);
    });
    test("forgotPassword - success", async () => {
        const req = { body: { farmId: "f1", email: "mail@example.com" } };
        const res = mockResponse();
        authService.forgotPassword.mockResolvedValue(undefined);
        await authController.forgotPassword(req, res, mockNext);
        expect(authService.forgotPassword).toHaveBeenCalledWith({ farmId: "f1", email: "mail@example.com" });
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith({
            message: "If the email exists in our system, you will receive a reset code",
        });
    });
    test("forgotPassword - error calls next", async () => {
        const req = { body: { farmId: "f1", email: "mail@example.com" } };
        const res = mockResponse();
        const error = new Error("Forgot error");
        authService.forgotPassword.mockRejectedValue(error);
        await authController.forgotPassword(req, res, mockNext);
        expect(mockNext).toHaveBeenCalledWith(error);
    });
    test("confirmReset - success", async () => {
        const req = {
            body: { farmId: "f1", email: "mail@example.com", code: "123", newPassword: "newPass" },
        };
        const res = mockResponse();
        authService.confirmReset.mockResolvedValue(undefined);
        await authController.confirmReset(req, res, mockNext);
        expect(authService.confirmReset).toHaveBeenCalledWith({
            farmId: "f1",
            email: "mail@example.com",
            code: "123",
            newPassword: "newPass",
        });
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith({ message: "Password reset successfully" });
    });
    test("confirmReset - error calls next", async () => {
        const req = { body: {} };
        const res = mockResponse();
        const error = new Error("Reset error");
        authService.confirmReset.mockRejectedValue(error);
        await authController.confirmReset(req, res, mockNext);
        expect(mockNext).toHaveBeenCalledWith(error);
    });
});
//# sourceMappingURL=auth.controller.test.js.map