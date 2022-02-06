import joi from 'joi';

const updateTransactionSchema = joi.object({
    _id: joi.required(),
    description: joi.string().required(),
    value: joi.string().pattern(/^[0-9]*,[0-9]{2}$/).required(),
    type: joi.string().valid('deposit', 'payment'),
    userId: joi.string().required(),
    date: joi.required()
})

export default updateTransactionSchema;