const Employee = require("../../../models/employeeModel");
const jwt=require('jsonwebtoken');
module.exports.login=async(req,res)=>{
    try{
        const checkEmail=await Employee.findOne({email:req.body.email})
        if(checkEmail){
            let token=jwt.sign({empToken:checkEmail},'emp',{expiresIn:'8h'})
            return res.status(200).json({message:'login successfully!',status:1,token:token})
        }
        else{
            return res.status(400).json({message:'invalid email!',status:0})
        }
    }
    catch(err){
        console.log(err);
        return res.status(400).json({message:'error',status:0})
    }
}
module.exports.profile=async(req,res)=>{
    try{
        return res.status(200).json({message:'Here is your profile data!',status:1,data:req.user})
    }
    catch(err){
        console.log(err);
        return res.status(400).json({message:'error',status:0})
    }
}
module.exports.editProfile=async(req,res)=>{
    try{
        let findEmpId=await Employee.findById(req.params.id)
        if(findEmpId){
            let findEmpId=await Employee.findById(req.params.id);
            if(findEmpId){
                let editData=await Employee.findByIdAndUpdate(req.params.id,req.body)
                if(editData){
                    return res.status(200).json({message:'empData edited successfully!',status:1,data:editData})
                }
                else{
                    return res.status(400).json({message:'cannot edit empdata!',status:0})
                }
            }
            else{
                return res.status(400).json({message:'something is wrong!',status:0})
            }
        }
        else{
            return res.status(400).json({message:'something is wrong!',status:0})
        }
    }
    catch(err){
        console.log(err);
        return res.status(400).json({message:'error',status:0})
    }
}