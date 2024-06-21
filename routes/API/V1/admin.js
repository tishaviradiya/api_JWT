const express=require('express')
const routes=express.Router();
const adminCtrl=require('../../../controllers/API/V1/adminCtrl');
const passport=require('passport')
routes.post('/register',adminCtrl.register);
routes.post('/login',adminCtrl.login);
routes.post('/managerRegister',passport.authenticate('jwt',{failureRedirect:'/admin/failLogin'}),adminCtrl.managerRegister);
routes.get('/failLogin',async(req,res)=>{
    try{
        return res.status(400).json({message:'first you have to login!',status:1})
    }
    catch(err){
        console.log(err);
        return res.status(400).json({message:'error',status:0})
    }
})
routes.get('/viewAllManagers',passport.authenticate('jwt',{failureRedirect:'/admin/failLogin'}),adminCtrl.viewAllManagers)
routes.delete('/deleteManager/:id',passport.authenticate('jwt',{failureRedirect:'/admin/failLogin'}),adminCtrl.deleteManager)
routes.get('/viewAllEmployee',passport.authenticate('jwt',{failureRedirect:'/admin/failLogin'}),adminCtrl.viewAllEmployee);
module.exports=routes;