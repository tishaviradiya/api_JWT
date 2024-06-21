const express=require('express')
const routes=express.Router();
const empController=require('../../../controllers/API/V1/employeeCtrl');
const passport = require('passport');
routes.post('/login',empController.login);
routes.get('/profile',passport.authenticate('empStrategy',{failureRedirect:'/employee/failLogin'}),empController.profile)
routes.put('/editProfile/:id',passport.authenticate('empStrategy',{failureRedirect:'/employee/failLogin'}),empController.editProfile);
routes.get('/failLogin',async(req,res)=>{
    try{
        return res.status(400).json({message:'you have to login first!',status:0})
    }
    catch(err){
        console.log(err);
        return res.status(400).json({message:'error',status:0})
    }
})
module.exports=routes;