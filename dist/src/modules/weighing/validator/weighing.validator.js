//Validar se a data é valida
function isValidDate(dateStr) {
    const date = new Date(dateStr);
    return !Number.isNaN(date.getTime());
}
// Valida se data é futura
function isNotFutureDate(dateStr) {
    return new Date(dateStr) <= new Date();
}
export function validateCreate(data) {
    // Animal - Obrigatorio
    if (!data.animalId || data.animalId.trim() === "") {
        throw new Error("Animal é obrigatório");
    }
    //Peso - Obrigatorio, deve ser positivo e dentro de uma faixa plausivel pra bovinos
    if (data.weightKg === undefined || data.weightKg === null) {
        throw new Error("Peso é obrigatório");
    }
    if (typeof data.weightKg !== "number" || Number.isNaN(data.weightKg)) {
        throw new Error("Peso deve ser um número");
    }
    if (data.weightKg <= 0) {
        throw new Error("Peso deve ser maior que zero");
    }
    if (data.weightKg > 1500) {
        throw new Error("Peso acima de 1500Kg - Verifique o valor informado");
    }
    // Data - Obrigatorio, válida e nao futura
    if (!data.date) {
        throw new Error("Data de pesagem é obrigatório");
    }
    if (!isValidDate(data.date)) {
        throw new Error("Data de pesagem inválida. Use formato ISO (DD/MM/AAAA)");
    }
    if (!isNotFutureDate(data.date)) {
        throw new Error("Data de pesagem não pode ser futura");
    }
    // Notas - Opcional
    if (data.notes !== undefined && data.notes !== null) {
        if (data.notes.trim().length > 500) {
            throw new Error("Notas devem ter no máximo 500 caracteres");
        }
    }
}
export function validateUpdate(data) {
    if (data.weightKg !== undefined) {
        if (typeof data.weightKg !== "number" || Number.isNaN(data.weightKg)) {
            throw new Error("Peso deve ser um número");
        }
        if (data.weightKg <= 0) {
            throw new Error("Peso deve ser maior que zero");
        }
        if (data.weightKg > 1500) {
            throw new Error("Peso acima de 1500kg — verifique o valor informado");
        }
    }
    if (data.date !== undefined) {
        if (!isValidDate(data.date)) {
            throw new Error("Data da pesagem inválida. Use formato ISO (DD/MM/AAAA)");
        }
        if (!isNotFutureDate(data.date)) {
            throw new Error("Data da pesagem não pode ser futura");
        }
    }
    if (data.notes !== undefined && data.notes !== null) {
        if (data.notes.trim().length > 500) {
            throw new Error("Notas devem ter no máximo 500 caracteres");
        }
    }
}
export default { validateCreate, validateUpdate };
//# sourceMappingURL=weighing.validator.js.map