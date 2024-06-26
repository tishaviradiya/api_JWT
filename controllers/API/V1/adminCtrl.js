const Admin=require('../../../models/adminModel');
const bcrypt=require('bcrypt');
const jwt=require('jsonwebtoken');
const Manager=require('../../../models/managerModel');
const moment = require('moment');
const nodemailer=require('nodemailer');
const Employee = require('../../../models/employeeModel');
module.exports.register=async(req,res)=>{
    try{
        console.log(req.body);
        let checkEmail=await Admin.findOne({email:req.body.email});
        if(! checkEmail){
            if(req.body.password==req.body.confirm_password){
                req.body.password=await bcrypt.hash(req.body.password,10);
                let addData=await Admin.create(req.body);
                if(addData){
                    return res.status(200).json({message:'registration successfully !',status:1,data:addData});
                }
                else{
                    return res.status(400).json({message:'admindata has not been inserted !',status:0})
                }
            }
            else{
                return res.status(400).json({message:'password and confirm password are not same !',status:0})
            }
        }
        else{
            return res.status({message:'email is already exist !',status:0})
        }
    }
    catch(err){
        console.log(err);
        return res.status(400).json({message:'error',status:0})
    }
}
module.exports.login=async(req,res)=>{
    try{
        let checkEmail=await Admin.findOne({email:req.body.email});
        if(checkEmail){
            if(await bcrypt.compare(req.body.password,checkEmail.password)){
                let token=jwt.sign({adminToken:checkEmail},'api',{expiresIn:'8h'});
                return res.status(200).json({message:'login successfully!',status:1,data:token});
            }
            else{
                return res.status(400).json({message:'invalid password!',status:0})
            }
        }
        else{
            return res.status(400).json({message:'first you have to login !',status:0})
        }
    }
    catch(err){
        console.log(err);
        return res.status(400).json({message:'error',status:0})
    }
}
module.exports.managerRegister=async(req,res)=>{
    try{
        let checkManagerEmail=await Manager.findOne({email:req.body.email});
        if(!checkManagerEmail){
        req.body.password=req.body.name+'@'+Math.round(Math.random()*10000);
        req.body.role='Manager';
        req.body.adminId=req.user.id;
        req.body.created_date=moment().format('LLL');
        req.body.updated_date=moment().format('LLL');
        req.body.status=true;
        const transporter = nodemailer.createTransport({
            host: "smtp.gmail.com",
            port: 587,
            secure: false, // Use `true` for port 465, `false` for all other ports
            auth: {
              user: "prarthnakothiya6703@gmail.com",
              pass: "fcunkngozlymudwi",
            },
          });
          let mail=`Your email is ${req.body.email}<br/> your password is ${req.body.password}`;
          const info = await transporter.sendMail({
            from: ' 👻 <prarthnakothiya6703@gmail.com>', // sender address
            to: "tishaviradiya@gmail.com", // list of receivers
            subject: "Hello ✔", // Subject line
            text: "Hello world?", // plain text body
            html: `<h1>${mail}</h1>`, // html body
          });
          if(info){
            let addManagerData=await Manager.create(req.body);
            if(addManagerData){
                return res.status(200).json({message:'manager credentials are sent on this email!',status:1})
            }
            else{
                return res.status(400).json({message:'manager is not registered!',status:0})
            }
          }
          else{
            return res.status(400).json({message:'email is not sent! ',status:0})
          }
        }
        else{
            return res.status(400).json({message:'Invalid email',status:0})
        }
    }
    catch(err){
        console.log(err);
        return res.status(400).json({message:'error',status:0})
    }
}
module.exports.viewAllManagers=async(req,res)=>{
    try{
        let findManagerData=await Manager.find({});
        if(findManagerData){
            return res.status(200).json({message:'get the all managers data!',status:1,data:findManagerData})
        }
        else{
            return res.status(400).json({message:'cannot get all managerdata!',status:0})
        }
    }
    catch(err){
        console.log(err);
        return res.status(400).json({message:'error',status:0})
    }
}
module.exports.deleteManager=async(req,res)=>{
    try{
        let findId=await Manager.findById(req.params.id);
        if(findId){
            let deleteData=await Manager.findByIdAndDelete(req.params.id);
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
module.exports.viewAllEmployee=async(req,res)=>{
    try{
        let search='';
        if(req.query.search){
            search=req.query.search
        }
        let page=0;
        let per_page=2;
        if(req.query.page){
            page=req.query.page
        }
        let allRecord=await Employee.find({ 
            $or:[
            {name:{$regex:search,$options:'i'}},
            {email:{$regex:search,$options:'i'}},
            {designation:{$regex:search,$options:'i'}}
        ]}).countDocuments();
        let totalRecord=Math.ceil(allRecord/per_page);
        let findEmpData=await Employee.find({
            $or:[
                {name:{$regex:search,$options:'i'}},
                {email:{$regex:search,$options:'i'}},
                {designation:{$regex:search,$options:'i'}}
            ]
        })
        .skip(page*per_page)
        .limit(per_page)
        if(findEmpData){
            return res.status(200).json({message:'get the empData!',status:1,data:findEmpData,search:search,totalRecord:totalRecord})
        }
        else{
            return res.status(400).json({message:'cannot get empData!',status:0})
        }
    }
    catch(err){
        console.log(err);
        return res.status(400).json({message:'error',status:0})
    }
}