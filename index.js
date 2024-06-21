const express=require('express')
const port=8001;
const app=express();
app.use(express.urlencoded());
const db=require('./config/mongoose');
const passport=require('passport');
const passportJwtStrategy=require('./config/passportJwtStrategy');
const session=require('express-session');
app.use(session({
    name:'api',
    secret:'api',
    saveUninitialized:true,
    cookie:{
        maxage:1000*60*60
    }
}));
app.use(passport.initialize());
app.use(passport.session());
app.use('/',require('./routes/API/V1'));
app.listen(port,(err)=>{
    err?console.log(err):console.log(`port is running on server ! ${port}`);
});