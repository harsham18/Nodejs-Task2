const joi=require("@hapi/joi");

const schema={
    user:joi.object({
        id:joi.string().required(),
        login:joi.string().required(),
        password:joi.string().alphanum().pattern(new RegExp("^[a-zA-Z0-9]{3,30}$")).required(),
        age:joi.number().integer().min(4).max(130).required(),
        isDeleted:joi.boolean().required(),
    })
};

module.exports=schema;