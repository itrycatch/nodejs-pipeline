var express=require('express')

var app=express()

app.get('/users',function(req,res){
    console.log(req.url);
    res.write("Blah");
    res.end()
});

app.listen(3000);

