const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const validatorjs = require('validator')

const userSchema = new Schema({
    email: {
        type: String,
        required: true,
        trim: true,
        unique: true,
        validate: {
            validator: (email) => {
                return validatorjs.isEmail(email)
            },
            message: props => {{`${props.value} is not a valid email`}}
        }
    },
    password: {
        type:String,
        required: true,
        minlength: 5
    }
})

const User = mongoose.model('User', userSchema);
module.exports = User;