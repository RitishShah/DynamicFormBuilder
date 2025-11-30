const mongoose = require("mongoose");

const optionSchema = new mongoose.Schema({
    label: { 
        type: String, 
        required: true 
    },
    value: { 
        type: String, 
        required: true 
    },
    nestedFields: [{ type: mongoose.Schema.Types.Mixed }] // nestedFields when this option selected (array of FieldSchema-like objects)
}, { _id: false });

const fieldSchema = new mongoose.Schema({
    name: { 
        type: String, 
        required: true
    },
    type: { 
        type: String, 
        enum: ['text','textarea','number','email','date','checkbox','radio','select','file'],
        required: true
    },
    required: {
        type: Boolean, 
        default: false,
        required: true
    },
    options: [optionSchema], // for select/radio/checkbox
    validation: {
        type: mongoose.Schema.Types.Mixed
    }, // { min, max, regex }
    order: { 
        type: Number, 
        default: 0
    },
}, { _id: false });

const formSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    fields: [fieldSchema],
    createdBy: {
        type: mongoose.Schema.ObjectId,
        ref: 'User'
    },
    updatedBy: {
        type: mongoose.Schema.ObjectId,
        ref: 'User'
    },
    createdAt: {
        type: Date,
        default: Date.now()
    },
    updatedAt: {
        type: Date
    }
});

module.exports = mongoose.model('Form', formSchema);