const express=require('express')
const routes=express.Router();
routes.use('/admin',require('./admin'));
routes.use('/manager',require('./manager'));
routes.use('/employee',require('./employee'));
module.exports=routes;