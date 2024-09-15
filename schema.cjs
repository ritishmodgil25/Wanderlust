const Joi = require('joi');

const listingSchema = Joi.object({
    listing: Joi.object({
        title: Joi.string().required(),
        description: Joi.string().required(),
        location: Joi.string().required(),
        country: Joi.string().required(),
        category: Joi.string().required(),
        price: Joi.number().min(0).required(),
        image: Joi.object({
            url: Joi.string().allow('', null).optional(), // Define image as an object with a url property
        }).optional(),
    }).required()
});

const reviewSchema = Joi.object({
    review: Joi.object({
        rate: Joi.number().min(1).max(5).required(),
        comment: Joi.string().required()
    }).required()
})
module.exports = { reviewSchema, listingSchema };