const express = require('express');
const router = express.Router();
const checkAuth = require('../middleware/checkAuth');
const { createFormValidations, updateFormValidations, deleteFormValidations, getFormValidations, submitFormValidations } = require('../validator/formValidator');
const { createForm, updateForm, deleteForm, getAllForms, getForm, submitForm } = require('../controller/formController');

router.post('/create-form', checkAuth, createFormValidations, createForm); // Create form
router.put('/update-form/:id', checkAuth, updateFormValidations, updateForm); // Update form
router.delete('/delete-form/:id', checkAuth, deleteFormValidations, deleteForm); // Delete form

router.get('/forms', checkAuth, getAllForms); // Get all forms
router.get('/form/:id', checkAuth, getFormValidations, getForm); // Get single form

router.post('/form/:id/submit', checkAuth, submitFormValidations, submitForm);

module.exports = router;