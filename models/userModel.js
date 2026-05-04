const mongoose = require("mongoose")
const {schema} = mongoose

const useSchema = new Schema({
    firstName:{
        Type:String
    },
    lastName:{
        Type:String
    },
    email:{
        Type:String
    },
    password:{
        Type:String
    },
    phoneNumber:{
        Type:String
    },
    terms:{
        Type:Boolean
    },
    profile:{
        Type:String
    },
    isVerified:{
         Type:Boolean,
         default:false
    },
    role:{
         Type:String,
         enum:['admin','user','editor','vendor'],
         default:'user'
    },
    isHold:{
         Type:Boolean,
         default:false
    },
    billingAddress:{
        firstName:{
            Type:String
        },
        lastName:{
            Type:String
        },
        email:{
            Type:String
        },
        companyName:{
            Type:String
        },
        street:{
            Type:String
        },
        state:{
            Type:String
        },
        zipCode:{
            Type:String
        },
        phoneNumber:{
            Type:String
        },
        country:{
            Type:String
        },
        
    },

})
module.exports = mongoose.model('User',useSchema)