const {z, minLength} = require('zod');

const userInputValidator = z.object({
    name:z.string(),
    email:z.email(),
    password:z.string(minLength(8))
})

const userLoginValidator = z.object({
    name:z.string(),
    password:z.string(minLength(8))
})

module.exports = userInputValidator,userLoginValidator;