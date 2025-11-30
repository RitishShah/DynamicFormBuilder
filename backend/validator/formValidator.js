const mongoose = require('mongoose');
const utils = require('../utils/response');

exports.createFormValidations = (req, res, next) => {
    const bodyData = req.body;
    let errorMsg = [];

    if (!bodyData.title || typeof bodyData.title !== "string" || bodyData.title.trim().length < 3) {
        errorMsg.push("Title is required and must be at least 3 characters.");
    }

    if (bodyData.description && typeof bodyData.description !== "string") {
        errorMsg.push("Description must be a string.");
    }

    if (!Array.isArray(bodyData.fields) || bodyData.fields.length === 0) {
        errorMsg.push("Fields array is required and cannot be empty.");
    } else {
        bodyData.fields.forEach((field, index) => {
            const prefix = `Field[${index}]: `;

            // name
            if (!field.name || typeof field.name !== "string") {
                errorMsg.push(prefix + "name is required.");
            }

            // type
            const validTypes = ['text','textarea','number','email','date','checkbox','radio','select','file'];
            if (!validTypes.includes(field.type)) {
                errorMsg.push(prefix + `Invalid type '${field.type}'.`);
            }

            // required
            if (field.required !== undefined && typeof field.required !== "boolean") {
                errorMsg.push(prefix + "required must be a boolean.");
            }

            // nested field options required for radio / select / checkbox
            if (['radio', 'select', 'checkbox'].includes(field.type)) {
                if (!Array.isArray(field.options) || field.options.length === 0) {
                    errorMsg.push(prefix + "options are required for radio/select/checkbox.");
                } else {
                    field.options.forEach((opt, optIndex) => {
                        const optPrefix = `${prefix}Option[${optIndex}]: `;
                        if (!opt.label || typeof opt.label !== "string") {
                            errorMsg.push(optPrefix + "label is required.");
                        }
                        if (!opt.value || typeof opt.value !== "string") {
                            errorMsg.push(optPrefix + "value is required.");
                        }
                    });
                }
            }

            // validation
            if (field.validation && typeof field.validation !== "object") {
                errorMsg.push(prefix + "validation must be an object.");
            }

            // order
            if (field.order !== undefined && typeof field.order !== "number") {
                errorMsg.push(prefix + "order must be a number.");
            }
        });
    }

    if (errorMsg.length > 0) {
        return utils.response(res, 'fail', errorMsg, null, 400);
    } else {
        req.body = bodyData;
        next();
    }
};

exports.updateFormValidations = (req, res, next) => {
    const bodyData = req.body;
    const formId = req.params.id;
    let errorMsg = [];

    if(!formId) {
        errorMsg.push("Form Id is not provided.");
    } else if(!mongoose.Types.ObjectId.isValid(formId)) {
        errorMsg.push("Form Id is not valid.");
    }

    if (!bodyData.title || typeof bodyData.title !== "string" || bodyData.title.trim().length < 3) {
        errorMsg.push("Title is required and must be at least 3 characters.");
    }

    if (bodyData.description && typeof bodyData.description !== "string") {
        errorMsg.push("Description must be a string.");
    }

    if (!Array.isArray(bodyData.fields) || bodyData.fields.length === 0) {
        errorMsg.push("Fields array is required and cannot be empty.");
    } else {
        bodyData.fields.forEach((field, index) => {
            const prefix = `Field[${index}]: `;

            // name
            if (!field.name || typeof field.name !== "string") {
                errorMsg.push(prefix + "name is required.");
            }

            // type
            const validTypes = ['text','textarea','number','email','date','checkbox','radio','select','file'];
            if (!validTypes.includes(field.type)) {
                errorMsg.push(prefix + `Invalid type '${field.type}'.`);
            }

            // required
            if (field.required !== undefined && typeof field.required !== "boolean") {
                errorMsg.push(prefix + "required must be a boolean.");
            }

            // nested field options required for radio / select / checkbox
            if (['radio', 'select', 'checkbox'].includes(field.type)) {
                if (!Array.isArray(field.options) || field.options.length === 0) {
                    errorMsg.push(prefix + "options are required for radio/select/checkbox.");
                } else {
                    field.options.forEach((opt, optIndex) => {
                        const optPrefix = `${prefix}Option[${optIndex}]: `;
                        if (!opt.label || typeof opt.label !== "string") {
                            errorMsg.push(optPrefix + "label is required.");
                        }
                        if (!opt.value || typeof opt.value !== "string") {
                            errorMsg.push(optPrefix + "value is required.");
                        }
                    });
                }
            }

            // validation
            if (field.validation && typeof field.validation !== "object") {
                errorMsg.push(prefix + "validation must be an object.");
            }

            // order
            if (field.order !== undefined && typeof field.order !== "number") {
                errorMsg.push(prefix + "order must be a number.");
            }
        });
    }

    if (errorMsg.length > 0) {
        return utils.response(res, 'fail', errorMsg, null, 400);
    } else {
        req.body = bodyData;
        next();
    }
};

exports.deleteFormValidations = (req, res, next) => {
    const formId = req.params.id;
    let errorMsg = [];

    if(!formId) {
        errorMsg.push("Form Id is not provided.");
    } else if(!mongoose.Types.ObjectId.isValid(formId)) {
        errorMsg.push("Form Id is not valid.");
    }

    if (errorMsg.length > 0) {
        return utils.response(res, 'fail', errorMsg, null, 400);
    } else {
        next();
    }
};

exports.getFormValidations = (req, res, next) => {
    const formId = req.params.id;
    let errorMsg = [];

    if(!formId) {
        errorMsg.push("Form Id is not provided.");
    } else if(!mongoose.Types.ObjectId.isValid(formId)) {
        errorMsg.push("Form Id is not valid.");
    }

    if (errorMsg.length > 0) {
        return utils.response(res, 'fail', errorMsg, null, 400);
    } else {
        next();
    }
};

exports.submitFormValidations = (req, res, next) => {
    const formId = req.params.id;
    const answers = req.body;
    let errorMsg = [];

    if(!formId) {
        errorMsg.push("Form Id is not provided");
    } else if (!mongoose.Types.ObjectId.isValid(formId)) {
        errorMsg.push("Form Id is not valid.");
    }

    if (!answers || !Array.isArray(answers)) {
        errorMsg.push("Answers must be provided or type should be an array.");
    }

    if (errorMsg.length > 0) {
        return utils.response(res, 'fail', errorMsg, null, 400);
    } else {
        next();
    }
};