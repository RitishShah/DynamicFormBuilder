const mongoose = require('mongoose');
const Form = require('../models/formModel');
const utils = require('../utils/response');
const FormResponse = require('../models/formResponse');

exports.createForm = async (req, res) => {
    try {
        const formData = req.body;
        const userId = req.user.id;
        const form = await Form.create({
            title: formData.title,
            description: formData.description,
            fields: formData.fields,
            createdBy: userId
        });
        console.log("FORM", form);
        utils.response(res, 'success', 'Form Created', form, 200);
    } catch (error) {
        utils.response(res, 'fail', error.message, null, 403);
    }
};

exports.updateForm = async (req, res) => {
    try {
        const formId = req.params.id;
        const formData = req.body;
        const userId = req.user.id;
        const form = await Form.findById(formId);
        if(!form) {
            utils.response(res, 'fail', "Form doesn't exist with provided id", null, 400);
        }

        const updatedForm = await Form.findByIdAndUpdate(formId, {
            title: formData.title,
            description: formData.description,
            fields: formData.fields,
            updatedAt: Date.now(),
            updatedBy: userId
        }, { new: true });
        
        console.log("Updated FORM", updatedForm);
        utils.response(res, 'success', 'Form Updated', updatedForm, 200);
    } catch (error) {
        utils.response(res, 'fail', error.message, null, 403);
    }
};

exports.deleteForm = async (req, res) => {
    try {
        const formId = req.params.id;
        await Form.findByIdAndDelete(formId);
        utils.response(res, 'success', 'Form Deleted', true, 200);
    } catch (error) {
        utils.response(res, 'fail', error.message, null, 403);
    }
};

exports.getAllForms = async (req, res) => {
    try {
        const forms = await Form.find();
        utils.response(res, 'success', 'Get all forms', forms, 200);
    } catch (error) {
        utils.response(res, 'fail', error.message, null, 403);
    }
};

exports.getForm = async (req, res) => {
    try {
        const formId = req.params.id;
        const form = await Form.findById(formId);
        utils.response(res, 'success', 'Get form associated with provided id', form, 200);
    } catch (error) {
        utils.response(res, 'fail', error.message, null, 403);
    }
};

exports.submitForm = async (req, res) => {
    try {
        const formId = req.params.id;
        const answers = req.body;
        const userId = req.user.id;

        const form = await Form.findById(formId);
        if(!form) {
            utils.response(res, 'fail', "Form doesn't exist with provided id", null, 400);
        }

        let errorMsg = [];

        form.fields.forEach(field => {
            const userAnswer = answers.find(a => a.fieldName === field.name);

            // If required is true and answer not provided for field.
            if(field.required && (!userAnswer || userAnswer.value === "")) {
                console.log("User", userAnswer);
                errorMsg.push(`${field.name} is required`);
            }

            // Options validation
            if(["select", "radio", "checkbox"].includes(field.type)) {
                const allowed = field.options.map(opt => opt.value);

                if(userAnswer) {
                    if(field.type === "checkbox") {
                        if(!Array.isArray(userAnswer.value)) {
                            errorMsg.push(`${field.name} must be an array`);
                        } else {
                            userAnswer.value.forEach(v => {
                                if(!allowed.includes(v)) {
                                    errorMsg.push(`${field.name} contains invalid option: ${v}`);
                                }
                            });
                        }
                    } else {
                        // Radio and Select type must be string
                        if(typeof userAnswer.value !== "string") {
                            errorMsg.push(`${field.name} must be a string.`);
                        } else {
                            // Must be one of allowed options
                            if(!allowed.includes(userAnswer.value)) {
                                errorMsg.push(`${field.name} has invalid option: ${userAnswer.value}`);
                            } else {
                                // Validate nestedFields (if any)
                                const selectedOption = field.options.find(opt => opt.value === userAnswer.value);

                                if(selectedOption?.nestedFields?.length > 0) {
                                    selectedOption.nestedFields.forEach(nested => {
                                        // Option for radio type
                                        if(nested.type === "Number") {
                                            if(nested.required && userAnswer.nestedAnswer === "") {
                                                errorMsg.push(`${nested.name} required value`)
                                            }
                                        }
                                        // Option for select type
                                        else if(nested.type === "select") {
                                            const selectedNestedOption = nested.options.find(nestedOpt => nestedOpt.value === userAnswer.nestedAnswer);

                                            if(nested.required && !selectedNestedOption) {
                                                console.log("User", userAnswer);
                                                errorMsg.push(`${nested.name} is required`);
                                            }
                                        }
                                    });
                                }
                            }
                        }
                    }
                }
            }
        });

        if(errorMsg.length > 0) {
            return utils.response(res, 'fail', "Form is not submitting", errorMsg, 400);
        }

        const formResponse = await FormResponse.create({
            formId: formId,
            submittedBy: userId,
            answers: answers
        });

        utils.response(res, 'success', 'Form reponse submitted successfully', formResponse, 200);

    } catch (error) {
        utils.response(res, 'fail', error.message, null, 403);
    }
};