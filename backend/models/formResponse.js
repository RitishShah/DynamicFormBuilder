const mongoose = require('mongoose');

const answerSchema = new mongoose.Schema({
    fieldName: { 
        type: String, 
        required: true 
    }, // matches field.name
    value: { 
        type: mongoose.Schema.Types.Mixed
    }, // string/array/object depending on field
    nestedAnswers: { 
        type: mongoose.Schema.Types.Mixed,
    }
}, { _id: false });

const formResponseSchema = new mongoose.Schema({
    formId: { 
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Form', 
        required: true 
    },
    submittedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    answers: [answerSchema],
    createdAt: { 
        type: Date, 
        default: Date.now() 
    },
    meta: { 
        type: mongoose.Schema.Types.Mixed 
    } // optional: user, ip, userAgent...
});

module.exports = mongoose.model('FormResponse', formResponseSchema);