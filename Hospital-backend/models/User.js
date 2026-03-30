const mongoose = require('mongoose');
const Joi = require('joi');


// User schema
const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        minlength: 2,
        maxlength: 200,
        trim: true,
        
    },
    email: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 100,
        trim: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 100,
        trim: true,
    },
    isAdmin: {
        type: Boolean,
        default: false
    },
}, {
    timestamps: true
});
    // User model
const User = mongoose.model('User', UserSchema);


//Validate Register User
function validateRegisterUser(obj) {
    const schema = Joi.object({
        username: Joi.string().min(2).max(200).trim().required(),
        email: Joi.string().email().min(5).max(100).trim().required(),
        password: Joi.string().trim().min(6).required(),
        isAdmin: Joi.bool()
    });
    return schema.validate(obj);
}

//Validate Login User
function validateLoginUser(obj) {
    const schema = Joi.object({
        email: Joi.string().email().min(5).max(100).trim().required(),
        password: Joi.string().trim().min(6).required(),
    });
    return schema.validate(obj);
}

//Validate Update User
function validateUpdateUser(obj) {
    const schema = Joi.object({
        username: Joi.string().min(2).max(200).trim(),
        email: Joi.string().email().min(5).max(100).trim(),
        password: Joi.string().trim().min(6),
        isAdmin: Joi.bool()
    });
    return schema.validate(obj);
}
    
module.exports = { User, validateRegisterUser, validateLoginUser, validateUpdateUser };