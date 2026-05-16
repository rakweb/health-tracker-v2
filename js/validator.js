// js/validator.js
const Validator = {
    entry(data) {
        const errors = [];

        if (!data.date) errors.push("Date is required");
        if (data.glucose !== null && (data.glucose < 0 || data.glucose > 1000)) {
            errors.push("Glucose must be between 0 and 1000 mg/dL");
        }
        if (data.pain !== null && (data.pain < 0 || data.pain > 10)) {
            errors.push("Pain score must be between 0 and 10");
        }

        return {
            valid: errors.length === 0,
            errors: errors
        };
    }
};

console.log("✅ validator.js loaded");
window.Validator = Validator;
