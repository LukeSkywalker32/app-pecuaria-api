export function validateCreate(data) {
    if (!data.name || data.name.trim().length < 2) {
        throw new Error("Raça deve ter pelo menos 2 caracteres");
    }
    if (data.name.trim().length > 50) {
        throw new Error("Raça deve ter no máximo 50 caracteres");
    }
    if (!/^[a-zA-ZÀ-ÿ0-9\s-]+$/.test(data.name.trim())) {
        throw new Error("Nome da raça contém caracteres inválidos");
    }
}
export function validateUpdate(data) {
    if (data.name !== undefined) {
        if (data.name.trim().length < 2) {
            throw new Error("Raça deve ter pelo menos 2 caracteres");
        }
        if (data.name.trim().length > 50) {
            throw new Error("Raça deve ter no máximo 50 caracteres");
        }
        if (!/^[a-zA-ZÀ-ÿ0-9\s-]+$/.test(data.name.trim())) {
            throw new Error("Nome da raça contém caracteres inválidos");
        }
    }
}
export default { validateCreate, validateUpdate };
//# sourceMappingURL=breed.validator.js.map