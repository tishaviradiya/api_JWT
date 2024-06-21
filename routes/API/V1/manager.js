const express=require('express')
const routes=express.Router();
const managerController=require('../../../controllers/API/V1/managerCtrl');
const passport=require('passport')
routes.post('/login',managerController.login);
routes.get('/profile',passport.authenticate('managerJwt',{failureRedirect:'/manager/failLogin'}),managerController.profile);
routes.put('/editProfile/:id',passport.authenticate('managerJwt',{failureRedirect:'/manager/failLogin'}),managerController.editProfile)
routes.get('/failLogin',async(req,res)=>{
    try{
        return res.status(400).json({message:'you have to login first!',status:0})
    }
    catch(err){
        console.log(err);
        return res.status(400).json({message:'error',status:0})
    }
});
routes.post('/employeeRegister',passport.authenticate('managerJwt',{failureRedirect:'/manager/failLogin'}),managerController.employeeRegister)
routes.get('/viewAllEmployee',passport.authenticate('managerJwt',{failureRedirect:'/manager/failLogin'}),managerController.viewAllEmployee)
routes.delete('/deleteEmployee/:id',passport.authenticate('managerJwt',{failureRedirect:'/manager/failLogin'}),managerController.deleteEmployee)
module.exports=routes;