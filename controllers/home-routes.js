const router = require('express').Router();
const sequelize = require('../config/connection');
const { Post, User, Comment } = require('../models');

// render the  homepage
// and pass logged-in status
router.get('/', (req, res) => {
  console.log('======================');
  res.render('homepage', {
        loggedIn: req.session.loggedIn
      });
    
    });

//if already logged in, render home page
// otherwise render login page
router.get('/login', (req, res) => {
  if (req.session.loggedIn) {
    res.redirect('/');
    return;
  }
  res.render('login');
});

router.get('/signup', (req, res) => {
  // if already logged in  go to home page
  if (req.session.loggedIn) {
    res.redirect('/');
    return;
  } 
  res.render('signup');
});

module.exports = router;
