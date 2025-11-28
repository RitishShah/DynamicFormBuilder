const bcrypt = require('bcrypt');
const mongoose = require('mongoose');
const {validateEmail, validatePassword } = require('../utils/helper');
const utils = require('../utils/response');

exports.createUserValidations = (req, res, next) => {
    const bodyData = req.body;
    let errorMsg = [];

    console.log("Validations", bodyData);

    if(!bodyData.email) {
        errorMsg.push('Email is required');
    } else {
        if(!validateEmail(bodyData.email)) {
            errorMsg.push("Invalid Email Format!!");
        }
    }

    if(!bodyData.password) {
        errorMsg.push('password  is required')
    } else {
        if (!validatePassword(bodyData.password)) {
            errorMsg.push("Minimum eight characters, at least one letter, one number and one special character");
        }
    }

    if (errorMsg.length > 0) {
        return utils.response(res, 'fail', errorMsg, null, 400);
    }

    bcrypt.hash(bodyData.password, 12, (error, result) => {
        if(error){
            return utils.response(res, 'fail', error.message, null, 400);
        }else{
            bodyData['_id'] = new mongoose.Types.ObjectId();
            bodyData['password'] = result;
            req.body = bodyData;
            next()
        }
    })
};

exports.loginValidations = (req, res, next) => {
    const bodyData = req.body;
    let errorMsg = [];

    if (!bodyData.email) {
        errorMsg.push('Email is required');
    } else {
        if (!validateEmail(bodyData.email)) {
            errorMsg.push("Invalid Email Format!!");
        }
    }

    if (!bodyData.password) {
        errorMsg.push("password  is required");
    }

    if (errorMsg.length > 0) {
        return utils.response(res, 'fail', errorMsg, null, 400);
    } else {
        req.body = bodyData;
        next();
    }
};