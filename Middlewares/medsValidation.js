const Joi = require("joi");

const medSchema = Joi.object({
  medicine: Joi.string().min(1).max(100).required().messages({
    "string.base": "Medicine must be a string",
    "string.empty": "Medicine name cannot be empty",
    "string.min": "Medicine name must be at least 1 character",
    "string.max": "Medicine name cannot exceed 100 characters",
    "any.required": "Medicine name is required",
  }),
  datetime: Joi.date().iso().required().messages({
    "date.base": "Datetime must be a valid date",
    "date.format": "Datetime must be in ISO format",
    "any.required": "Datetime is required",
  }),
});
 function ValidateDate(res,req,next){
    const { error } = bookSchema.validate(req.body, { abortEarly: false });
    if (error) {
        const ErrorMessage = error.details
        .map((detail) => detail.message)
        .join(", ");
    return res.status(400).json({ error: errorMessage });
    }

    next()
 }

function ValidateDateID(res,req,next){
    const id = parseInt(req.params.id)
    if (isNaN(id) || id <= 0) {
        return res.status(400).json({ error: "Invalid medication ID. Must be a positive number." });
        }
    next();
}

 


 module.exports = 
 {
    ValidateDate,
    ValidateDateID,

 }