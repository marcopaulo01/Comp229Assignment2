let express = require('express');
let router = express.Router();

let indexController = require('../controllers/index');

/* GET home page. */
router.get('/', indexController.displayHomePage);

/* GET home page. */
router.get('/home', indexController.displayHomePage);

/* GET About page. */
router.get('/about', indexController.displayAboutPage);

/* GET Projects page. */
router.get('/projects',indexController.displayProjectsPage);

/* GET Services page. */
router.get('/Services', indexController.displayServicesPage);

/* GET Contact page. */
router.get('/Contact', indexController.displayContactPage);

// Get Route for displaying Login Page
router.get('/login',indexController.displayLoginPage);

// Post Route for processing Login Page
router.post('/login', indexController.processLoginPage);

// Get Route for displaying Register Page
router.get('/register',indexController.displayRegisterPage);

// Post Route for processing Register Page
router.post('/register', indexController.processRegisterPage)

//Get to perform UserLogout
router.get('/logout', indexController.performLogout);

module.exports = router;
