const moment = require('moment');
const Manager=require('../../../models/managerModel');
const jwt=require('jsonwebtoken');
const Employee = require('../../../models/employeeModel');
const nodemailer=require('nodemailer')
module.exports.login=async(req,res)=>{
    try{
        console.log(req.body);
        let checkManagerEmail=await Manager.findOne({email:req.body.email})
        if(checkManagerEmail){
            if(req.body.password==checkManagerEmail.password){
                let jwtToken=jwt.sign({managerToken:checkManagerEmail},'Token',{expiresIn:'8h'})
                return res.status(400).json({message:'login successfully!',status:1,data:jwtToken})
            }
            else{
                return res.status(400).json({message:'Invalid password!',status:0})
            }
        }
        else{
            return res.status(400).json({message:'Invalid email!',status:0})
        }
    }
    catch(err){
        console.log(err);
        return res.status(400).json({message:'error',status:0})
    }
}
module.exports.profile=async(req,res)=>{
    try{
        return res.status(200).json({message:'manager profile is here!',status:1,data:req.user})
        
    }
    catch(err){
        console.log(err);
        return res.status(400).json({message:'error',status:0})
    }
}
module.exports.editProfile=async(req,res)=>{
    try{
        let findId=await Manager.findById(req.params.id);
        if(findId){
            let editId=await Manager.findById(req.params.id);
            if(editId){
                req.body.updated_date=moment().format('LLL');
                let editProfile=await Manager.findByIdAndUpdate(req.params.id,req.body);
                if(editProfile){
                    return res.status(200).json({message:'profile edited successfully!',status:1,data:editProfile})
                }
                else{
                    return res.status(400).json({message:'profile not edited!',status:0})
                }
            }
            else{
                return res.status(400).json({message:'cannot get right id of manager!',status:0})
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
module.exports.employeeRegister=async(req,res)=>{
    try{
        let checkEmpEmail=await Employee.findOne({email:req.body.email})
        if(! checkEmpEmail){
            req.body.password=req.body.name+'@'+Math.round(Math.random()*10000)
            req.body.status=true;
            req.body.created_date=moment().format('LLL');
            req.body.updated_date=moment().format('LLL');
            req.body.role="Employee";
            req.body.managerId=req.user.id;
            const transporter = nodemailer.createTransport({
                host: "smtp.gmail.com",
                port: 587,
                secure: false, // Use `true` for port 465, `false` for all other ports
                auth: {
                  user: "tishaviradiya@gmail.com",
                  pass: "zvjlvwueahaydzoc",
                },
              });
              let msg=`your email is ${req.body.email}<br/>your password is ${req.body.password}`
              const info = await transporter.sendMail({
                from: '"👻" <tishaviradiya@gmail.com>', // sender address
                to: "tishaviradiya@gmail.com", // list of receivers
                subject: "Hello ✔", // Subject line
                text: "Hello world?", // plain text body
                html: `<h1>${msg}</h1>`, // html body
              });
              if(info){
                let addEmpData=await Employee.create(req.body);
                console.log(req.body);
                if(addEmpData){
                    return res.status(200).json({message:'empdata inserted successfully!',status:1,data:addEmpData})
                }
                else{
                    return res.status(400).json({message:'empdata is not iserted!',status:0})
                }
              }
              else{
                return res.status(400).json({message:'email and password not send!',status:0})
              }
        }
        else{
            return res.status(400).json({message:'email is already exist!',status:0})
        }
    }
    catch(err){
        console.log(err);
        return res.status(400).json({message:'error',status:0})
    }
}
module.exports.viewAllEmployee=async(req,res)=>{
    try{
        let findData=await Manager.find({status:true});
        if(findData){
            return res.status(200).json({message:'get the all employess data!',status:1,data:findData})
        }
        else{
            return res.status(400).json({message:'cannot get details of all employees!',status:0})
        }
    }
    catch(err){
        console.log(err);
        return res.status(400).json({message:'error',status:0})
    }
}
module.exports.deleteEmployee=async(req,res)=>{
    try{
        let findId=await Employee.findById(req.params.id);
        console.log(req.params.id,'req.params.id');
        if(findId){
            let deleteData=await Employee.findByIdAndDelete(req.params.id);
            console.log('deletedata',req.body);
            if(deleteData){
            return res.status(200).json({message:'managerdata deleted successfully!',status:1})
            }
            else{
            return res.status(400).json({message:'managerdata not deleted!',status:0})
            }
        }
        else{
            return res.status(400).json({message:'something wrong!',status:0})
        }
    }
    catch(err){
        console.log(err);
        return res.status(400).json({message:'error',status:0})
    }
}
