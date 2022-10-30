let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');

//create a reference to model
let Contact = require('../models/contact');

module.exports.displayContactList = (req,res,next)=>{
    Contact.find((err, contactList)=>{
        if(err)
        {
            return console.error(err)
        }
        else
        {
            //console.log(ContactList);

            res.render('contact/list', {title: 'Contact List', ContactList: contactList});
        }
    });
}

module.exports.displayAddPage = (req,res,next)=>{
    res.render('contact/list', {title: 'Add Contact'})
}

module.exports.proccessAddPage = (req,res,next)=>{
    let newContact = Contact({
        "name": req.body.name,
        "number": req.body.number,
        "email": req.body.email
    });

    Contact.create(newContact, (err,Contact)=>{
        if(err)
        {
            console.log(err);
            res.end(err);
        }
        else
        {
            //refresh the list
            res.redirect('/contact-list');
        }
    });
}

module.exports.processEditPage = (req,res,next)=>{
    let id = req.params.id

    let updateContact = Contact({
        "-id": id,
        "name": req.body.name,
        "number": req.body.number,
        "email": req.body.email
    });

    Contact.updateOne({_id:id}, updateContact, (err)=>{
        if(err)
        {
            console.log(err);
            res.end(err);
        }
        else
        {
            //refresh the conatct list
            res.redirect('/contact-list');
        }
    });
}

module.exports.displayEditPage = (req,res,next)=>{
    let id = req.params.id;

    Contact.findById(id, (err, contactToEdit)=>{
        if(err)
        {
            console.log(err);
            res.end(err);
        }
        else
        {
            //show the edit view
            res.render('contact/edit', {title: 'Edit Contact', contact: contactToEdit})
        }
    });
}

module.exports.performDelete = (req,res,next)=>{
    let id = req.params.id;

    Contact.remove({_id:id}, (err)=>{
        if(err)
        {
            console.log(err);
            res.end(err);
        }
        else
        {
            //refresh the conatct list
            res.redirect('/contact-list');
        }
    })
}