let express = require('express');
let router = express.Router();
let Mongoode = require('mongoose');

let passport = require('passport');

let contactController = require('../controllers/contact');

//helper function for guard purposes
function requireAuth(req,res,next)
{
    //check if the user is logged in
    if(!req.isAuthenticated())
    {
        return res.redirect('/login');
    }
    next();
}

//Get Route
router.get('/', contactController.displayContactList);

// Get Route for displaying Add Page
router.get('/add', requireAuth,contactController.displayAddPage);

// Post Route for displaying Add Page
router.post('/add', requireAuth,contactController.proccessAddPage)

// Get Route for displaying Edit Page
router.get('/edit/:id', requireAuth,contactController.displayEditPage)

// Post Route for displaying Edit Page
router.post('/edit/:id', requireAuth,contactController.processEditPage);

//Get to perform Delete
router.get('/delete/:id', requireAuth,contactController.performDelete);

module.exports = router;