export function validateLogin(data) {
    // Farm
    if (!data.farmId || data.farmId.trim() === "") {
        throw new Error("FarmId é obrigatório");
    }
    // username
    if (!data.username || data.username.trim().length < 3) {
        throw new Error("username deve ter pelo menos 3 caracteres");
    }
    // Password
    if (!data.password || data.password.trim().length < 6) {
        throw new Error("Senha deve ter pelo menos 6 caracteres");
    }
}
export function validateForgotPassword(data) {
    // Farm
    if (!data.farmId || data.farmId.trim() === "") {
        throw new Error("Farm is required");
    }
    // Email
    if (!data.email || !validateEmail(data.email)) {
        throw new Error("Invalid email");
    }
}
export function validateConfirmReset(data) {
    // Farm
    if (!data.farmId || data.farmId.trim() === "") {
        throw new Error("Farm is required");
    }
    // Email
    if (!data.email || !validateEmail(data.email)) {
        throw new Error("Invalid email");
    }
    // Code
    if (!data.code || data.code.length !== 6) {
        throw new Error("Code must be 6 digits long");
    }
    // New password
    if (!data.newPassword || data.newPassword.length < 8) {
        throw new Error("New password must be at least 8 characters long");
    }
    // Validate password strength
    if (!hasStrongPassword(data.newPassword)) {
        throw new Error("Password must contain uppercase, lowercase, number and special character");
    }
}
export function validateEmail(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
}
export function hasStrongPassword(password) {
    const hasUppercase = /[A-Z]/.test(password);
    const hasLowercase = /[a-z]/.test(password);
    const hasNumber = /\d/.test(password);
    const hasSpecial = /[@$!%*?&]/.test(password);
    return hasUppercase && hasLowercase && hasNumber && hasSpecial;
}
//# sourceMappingURL=auth.validator.js.map