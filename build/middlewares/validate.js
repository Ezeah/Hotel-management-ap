"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function validateData(schema) {
    return (req, res, next) => {
        // const dataToValidate = req.method === 'GET' ? req.query : req.body;
        const { error } = schema.validate(req.body);
        if (error) {
            return res.status(400).json({ message: error.details[0].message });
        }
        next();
    };
}
exports.default = validateData;
