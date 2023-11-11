const express=require("express"); //importing express module
const url = require('url') //importing url module
const session=require('express-session') //importing session module
const nocache =require('nocache') //importing cache module
const app=express();  //defining an object of express
app.use(nocache())  //To disable cache 
app.set('view engine', 'hbs');  //set the view engine as HBS
app.use(express.urlencoded({extended:true}))
app.use(session({
    secret: 'key', 
    resave: false,
    saveUninitialized: true
  }));

var user;
var error;
var greeting="Welcome";
var heading="Express Project"
var phone=[{
     name: "Samsung K10 Mini 5G",
     price: "Rs 14999",
     description: "Get this Samsung Mobile at EMI starting from Rs 1666/- only.",
     image: "https://m.media-amazon.com/images/I/71C9Xby4DNL.jpg"
 },
{name: "Redmi 11 Prime 5G",
price: "Rs 8999",
description: "Get a chance to be a participant for bumper lot. Grab it today.",
image: "https://m.media-amazon.com/images/I/817vyrOUqmL._AC_SS300_.jpg"

},
{name: "OnePlus 10M 5G",
price: "Rs 29499",
description: "Buy this OnePlus Mobile and win assured prizes worth Rs1499/-.",
image: "https://image01-in.oneplus.net/ebp/202305/31/1-m00-51-66-cpgm7wr26omaegnzaaniaca13ya555.png?x-amz-process=image/format"
},
{
    name: "Nokia G42 5G",
    price: "Rs 11999",
    description: `Grab this Nokia Mobile with no cost EMI starting at Rs1999/- now.`,
    image: "https://s3b.cashify.in/gpro/uploads/2023/06/11115245/nokia-g42-5g-front.webp"

}]
  
app.get('/',(req,res)=>{
    if(req.session.isAuth){
       // res.render('home')
        res.redirect('/home')
    }else{
        //res.render('login');
        res.render('login',{"heading" :"Express Project"}); 
             }
}) 

app.post('/login',function(req,res){   
    // console.log(req.body.uname)
    // console.log(req.body.pass)
    console.log(req.body)
    user = req.body.uname;
    if(req.body.uname==="sanup" && req.body.pass==="s123p")
    {   
        req.session.isAuth = true;
        res.redirect('/home')
        console.log("1")
        error=false;
    }
        
    else
    {
        res.render('login',{heading,"value":"Please check the username/password entered","error":true}) //heading changed
    }       
})

function checkSignIn(req,res,next){
    if(req.session.isAuth){
        //res.render('home')
        console.log("2")
        next()
    }else{
        res.render('login',{heading}); //heading changed
    }
}

app.get('/home',checkSignIn,(req,res)=>{
    console.log("3")
    res.render('home',{user,greeting,phone})
})

app.get('/logout',(req,res)=>{
    //res.send("Logged out successfully")
    //req.session.isAuth = false;
    req.session.destroy(()=>{
        res.redirect('/')
    })
})
app.listen(2000,()=>console.log("server started"));