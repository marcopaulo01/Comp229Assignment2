let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');
let passport = require('passport');

//create the User Model Instance
let userModel = require('../models/user');
let User = userModel.User;

module.exports.displayHomePage = (req,res,next) => {
    res.render('index',{title: 'Home'});
}

module.exports.displayAboutPage = (req,res,next) => {
    res.render('about', { title: 'About'});
}

module.exports.displayProjectsPage = (req,res,next) => {
    res.render('projects', { title: 'Projects'});
}

module.exports.displayServicesPage = (req,res,next) => {
    res.render('services', { title: 'Services'});
}

module.exports.displayContactPage = (req,res,next) => {
    res.render('contact', { title: 'Contact'});
}

module.exports.displayLoginPage = (req, res, next) =>{
    //check if the user is logged in
    if(!req.user)
    {
        res.render('auth/login',
        {
            title: "Login",
            messages: req.flash('loginMessage'),
            dispalyName: req.user ? req.user.dispalyName: ''
        })
    }
    else{
        return res.redirect('/');
    }
}

module.exports.processLoginPage = (req,res,next) => {
    passport.authenticate('local',
    (err,user,info) =>{
        //server error?
        if(err)
        {
            return next(err);
        }
        if(!user)
        {
            req.flash('loginmessage','Authentication Error');
            return res.redirect('/login');
        }
        req.login(user, (err) =>{
            //server error?
            if(err)
            {
                return next(err);
            }
            return res.redirect('/contact-list');
        });
    })(req, res, next);
}

module.exports.displayRegisterPage = (req,res,next)=>{
    //check if the user is not already logged in
    if(!req.user)
    {
        res.render('auth/register',
        {
            title: 'Register',
            message: req.flash('registerMessage'),
            dispalyName: req.user ? req.user.dispalyName: ''
        });
    }
    else
    {
        return res.redirect('/');
    }
}

module.exports.processRegisterPage = (req,res,next) =>{
    //instantiate a user object
    let newUser = new User({
        username: req.body.username,
        //password: req.body.password
        email: req.body.email,
        dispalyName: req.body.dispalyName
    });

    User.register(newUser, req.body.password, (err) =>{
        if(err)
        {
            console.log("Error: Inserting New User");
            if(err.name == "UserExistsErro")
            {
                req.flash(
                    'registerMessage',
                    'Register Error: User Already Exsists!'
                );
                console.log('User Already Exsists!')
            }
            return res.render('auth/register',
            {
                title: 'Register',
                message: req.flash('registerMessage'),
                dispalyName: req.user ? req.user.dispalyName: ''
            })
        }
        else
        {
            //if no error exists, then registration is successful

            //redirect the user and autheticate them

            return passport.authenticate('local')(req,res, () =>{
                res.redirect('/contact-list')
            });
        }
    });
}

module.exports.performLogout = (req,res,next) =>{
    req.logout();
    res.redirect('/');
}