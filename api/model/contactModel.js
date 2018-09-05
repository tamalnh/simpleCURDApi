const mongoose = require('mongoose')
const Schema = mongoose.Schema
const validators = require('validator')

const contactSchema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    phone: {
        type: String,
        required: true,
        unique: true,
        validate:{
            validator: (number) => {
                return /^(?:\+88|01)?(?:\d{11}|\d{13})$/.test(number)
            },
            message: props => {`${props.value} is not a vaild phone number`}
        }
    },
    email: {
        type: String,
        unique: true,
        minlength: 3,
        trim: true,
        validate: {
            validator: (email) => {
                return validators.isEmail(email)
            },
            message: props => {`${props.value} is not a valid email`}
        }
    }
})

const Contact = mongoose.model('Contact', contactSchema);
module.exports = Contact;