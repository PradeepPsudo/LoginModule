var express = require('express');
var mysql = require('mysql');
var pug = require('pug');
var app = express();
app.set("views","./views");
app.set("view engine","pug");

var con = mysql.createConnection({
	host:"localhost",
	user:"root",
	password:"root",
	database:"login"
});

con.connect(function(err){
	if(err) throw err;
	console.log("Database Connected");
});

exports.register = function(req,res){
	//res.render("register.pug",{title:"Rulers Registration"});
	var date = new Date();
	var users = {
		"firstName":req.body.firstName,
		"lastName":req.body.lastName,
		"email":req.body.email,
		"password":req.body.password,
		"created":date,
		"modified":date
	};
	con.query("SELECT * FROM users WHERE email = ?",[users.email],function(err,response){
		if(err){
			res.json({message:"Error occured"});
		}else{
			if(response.length>0){
				res.json({message:"User already Exists, Please Relaod the Page"});
			}else{
				con.query("INSERT INTO users SET ?",users,function(err,response){
					if(err){
						res.json({message:"Some Problem while inserting User Data To DB"});
					}else{
						res.json({message:"User Registered Successfully!!"});
					}
				});
			}
		}
	});
}

exports.login = function(req,res){
	//res.render('login.pug',{title:"Rulers Login"});
	console.log("i am inside DB");
	//console.log(req.body);
	//console.log(res);
	var email = req.body.email;
	var password = req.body.password;
	con.query("SELECT * FROM users WHERE email = ?",[email],function(err,response,fields){
		if(err){
			res.json({message:"Something wrong at the Backend While attempting to Login"});
		}else{
			if(response.length >0){ 
				if(response[0].password == password){
					res.send({message:"User Logged in Successfully!!"});
				}else{
					res.json({message:"email and password does not match, try login again by refreshing page"});
					//res.sendStatus(200);
				}
			}else{
				res.send({message:"Email does not match"});
			}
		}
	});
}