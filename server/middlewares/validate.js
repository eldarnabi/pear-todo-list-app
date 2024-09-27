// middlewares/validate.js

import { validationResult } from 'express-validator';

const validate = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        // Format errors for consistency
        const formattedErrors = errors.array().map(err => ({
            field: err.param,
            message: err.msg
        }));
        return res.status(400).json({ errors: formattedErrors });
    }
    next();
};

export default validate;
