const passport=require('passport')
const passportStrategy=require('passport-jwt').Strategy;
const jwtExtract=require('passport-jwt').ExtractJwt;
const Admin=require('../models/adminModel');
const Manager=require('../models/managerModel');
const Employee = require('../models/employeeModel');
const Adminoptions={
    jwtFromRequest:jwtExtract.fromAuthHeaderAsBearerToken(),
    secretOrKey:'api',
}
passport.use(new passportStrategy(Adminoptions,async(adminData,done)=>{
    let findId=await Admin.findById(adminData.adminToken._id);
    if(findId){
        return done(null,findId)
    }
    else{
        return done(null,false);
    }
}));
passport.serializeUser((user,done)=>{
    return done(null,user.id)
})
passport.deserializeUser(async(id,done)=>{
    let findId=await Admin.findById(id);
    if(findId){
        return done(null,findId)
    }
    else{
        return done(null,false);
    }
});
const managerOptions={
    jwtFromRequest:jwtExtract.fromAuthHeaderAsBearerToken(),
    secretOrKey:'Token'
}
passport.use('managerJwt',new passportStrategy(managerOptions,(async(payloads,done)=>{
    let findManagerId=await Manager.findById(payloads.managerToken._id)
    if(findManagerId){
        return done(null,findManagerId);
    }
    else{
        return done(null,false)
    }
})));
const empOptions={
    jwtFromRequest:jwtExtract.fromAuthHeaderAsBearerToken(),
    secretOrKey:'emp',
}
passport.use('empStrategy',new passportStrategy(empOptions,async(empData,done)=>{
    let findEmpId=await Employee.findById(empData.empToken._id)
    if(findEmpId){
        return done(null,findEmpId)
    }
    else{
        return done(null,false)
    }
}));
module.exports=passport;