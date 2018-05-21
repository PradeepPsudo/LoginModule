var express = require("express");
var app = express();
var router = express.Router();
var bodyParser = require('body-parser');
var loginRoutes = require("./loginRoutes/routes");

app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
router.get("/",function(req,res){
	//res.json({message:"Welcome to Ruler's group"});
	res.send("Hello world");
});
app.use('/',router);
router.get("/login",function(req,res){
	res.render('login.pug',{title:"Rulers Login"});
});
router.get("/register",function(req,res){
	res.render('register.pug',{title:"Rulers Register"});
});
router.post("/login",loginRoutes.login);
router.post("/register",loginRoutes.register);
app.listen(3000);