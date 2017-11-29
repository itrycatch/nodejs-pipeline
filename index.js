var express=require('express')
var jsonF = require('./books');
var app=express()

app.get('/users',function(req,res){
    res.write(jsonF.firstName)
    res.end()
});

app.listen(3000);

module.exports=app;

