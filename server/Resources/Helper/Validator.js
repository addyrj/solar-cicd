var validator = require("email-validator");

const Validator = async (obj) => {
    let errorMessage = [];

    for (var key in obj) {
        if (obj[key] === "") {
            errorMessage.push(`Failed! Please enter ${key}`)
        }
    }
    if (obj.contact !== undefined) {
        if (obj.contact.length !== 10) {
            errorMessage.push(`Failed! Please enter 10 digit contact number`)
        }
    }

    if (obj.email !== undefined) {
        if (validator.validate(obj.email) === false) {
            errorMessage.push(`Failed! Please enter valid email address`)
        }
    }
    if (obj.password_confirmation !== undefined) {
        if (obj.password !== obj.password_confirmation) {
            errorMessage.push(`Failed! Password and confirm password does not match`)
        }
    }
    return errorMessage;
}

const passwordMatcher = (pass1, pass2) => {
    if (pass1 === pass2) {
        return true;
    } else {
        return false;
    }
}

module.exports = { Validator, passwordMatcher }