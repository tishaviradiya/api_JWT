const mongoose=require('mongoose')
const managerSchema=mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
    },
    role:{
        type:String,
        required:true,
    },
    designation:{
        type:String,
        required:true,
    },
    phone:{
        type:String,
        required:true,
    },
    age:{
        type:String,
        required:true,
    },
    password:{
        type:String,
        required:true,
    },
    status:{
        type:String,
        required:true,
    },
    created_date:{
        type:String,
        required:true,
    },
    updated_date:{
        type:String,
        required:true,
    },
    adminId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Admin',
        required:true,
    },
});
module.exports=mongoose.model('Manager',managerSchema);
