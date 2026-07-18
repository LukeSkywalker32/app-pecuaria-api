function isValidDate(dateStr) {
    const date = new Date(dateStr);
    return !Number.isNaN(date.getTime());
}
function isNotFuture(dateStr) {
    return new Date(dateStr) <= new Date();
}
export function validatePlace(data) {
    // Animal ID
    if (!data.animalId || data.animalId.trim() === "") {
        throw new Error("ID do animal é obrigatório");
    }
    // Número do brinco
    if (!data.earTagNumber || data.earTagNumber.trim().length < 1) {
        throw new Error("Número do brinco é obrigatório");
    }
    if (data.earTagNumber.trim().length > 20) {
        throw new Error("Número do brinco deve ter no máximo 20 caracteres");
    }
    if (!/^[a-zA-Z0-9-]+$/.test(data.earTagNumber.trim())) {
        throw new Error("Número do brinco deve conter apenas letras, números e hífens");
    }
    // Data de colocação
    if (!data.placementDate) {
        throw new Error("Data de colocação é obrigatória");
    }
    if (!isValidDate(data.placementDate)) {
        throw new Error("Data de colocação inválida. Use formato ISO (YYYY-MM-DD)");
    }
    if (!isNotFuture(data.placementDate)) {
        throw new Error("Data de colocação não pode ser futura");
    }
    // Motivo (opcional)
    if (data.reason !== undefined && data.reason !== null) {
        if (data.reason.trim().length > 200) {
            throw new Error("Motivo deve ter no máximo 200 caracteres");
        }
    }
}
export function validateRemove(data) {
    // Data de remoção
    if (!data.removalDate) {
        throw new Error("Data de remoção é obrigatória");
    }
    if (!isValidDate(data.removalDate)) {
        throw new Error("Data de remoção inválida. Use formato ISO (YYYY-MM-DD)");
    }
    if (!isNotFuture(data.removalDate)) {
        throw new Error("Data de remoção não pode ser futura");
    }
    // Motivo (opcional)
    if (data.reason !== undefined && data.reason !== null) {
        if (data.reason.trim().length > 200) {
            throw new Error("Motivo deve ter no máximo 200 caracteres");
        }
    }
}
export default { validatePlace, validateRemove };
//# sourceMappingURL=eartaghistory.validator.js.map