// js/validator.js
const Validator = {
    entry(data) {
        const errors = [];
        if (!data.date) errors.push("Date is required");
        if (data.glucose && (data.glucose < 0 || data.glucose > 1000)) 
            errors.push("Glucose must be between 0-1000");
        return { valid: errors.length === 0, errors };
    }
};

window.Validator = Validator;
