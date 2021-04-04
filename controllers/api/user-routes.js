const router = require('express').Router();
const { User, Meeting } = require('../../models');


////////////////////////////////////////
//  THESE ARE THE USER ROUTES
// (UR1) FIND ALL USERS 
//       get api/users
// (UR2) FIND USER by id
//       get /api/user/:id 
// (UR3) LOGIN user 
//       post api/users/login      
// (UR4) LOGOUT USER
//       post api/users/logout  
// (UR5) CREATE USER 
//       post  api/users    
// (UR6) UPDATE USER by user id
//       put /api/users/:id
// (UR7) DELETE USER by its ID
//       delete /api/users/:id
//
//  Developer's note: add withAuth to routes once they
// are implemented. In the meantime leave it off for 
// access via insomnia

/////////////////////////////////////////////////////////

// UR1 find ALL USERS
// route: get/api/users
// Not implemented

router.get('/',  (req, res) => {
  User.findAll({
    attributes:['id','firstname','lastname','available'],
  })
    .then(dbUserData => res.json(dbUserData))
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

// UR2 FIND USER BY ID
// (Use meeting routes to get meetings by user ID)
// returns all attributes except password
// get /api/users/id
// Not implemented


router.get('/:id',  (req, res) => {
  User.findOne({
    where: {
      id: req.params.id
    },
    attributes: { exclude: ['password'] },
  })
    .then(dbUserData => {
      if (!dbUserData) {
        res.status(404).json({ message: `No user found with id: ${req.params.id}`});
        return;
      }
      res.json(dbUserData);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});


// UR3 LOGIN USER
// login existing user
// called from login.js
// post route /api/users/login

router.post('/login',  (req, res) => {
  // expects {email: 'abnormal@gmail.com', password: 'pwdd'}
  User.findOne({
    where: {
      email: req.body.email
    }
  }).then(dbUserData => {
    if (!dbUserData) {
      res.status(400).json({ message: `No user found with email: ${req.body.email}` });
      return;
    }
    const validPassword = dbUserData.checkPassword(req.body.password);

    if (!validPassword) {
      res.status(400).json({ message: 'Incorrect password!' });
      return;
    }

    req.session.save(() => {
      req.session.user_id = dbUserData.id;
      req.session.firstname = dbUserData.firstname;
      req.session.lastname = dbUserData.lastname;
      req.session.loggedIn = true;
  
      res.json({ user: dbUserData, message: 'You are now logged in!' });
    });
  });
});

////////////////////////////////////////////
// UR4 LOGOUT  USER
// logs user out and ends session
// post api/users/logout

router.post('/logout', (req, res) => {
  if (req.session.loggedIn) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  }
  else {
    res.status(404).end();
  }
});



////////////////////////////////////////////
// UR5 CREATE NEW USER
// called from public/javascript/signup.js
// automatically logs user in at same time
// post api/users

router.post('/', (req, res) => {
  User.create({
    firstname: req.body.firstname,
    lastname: req.body.lastname,
    email: req.body.email,
    password: req.body.password,
    available: req.body.available
  })
    .then(dbUserData => {
        req.session.save(() => {
        req.session.user_id = dbUserData.id;
        req.session.firstname = dbUserData.firstname;
        req.session.lastname = dbUserData.lastname;
        req.session.loggedIn = true;
        res.json(dbUserData);
      });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});
////////////////////////////////////////////
// UR6 UPDATE USER by ID
// updates information as specified
// you don't have to send the whole user, just the
// name:value to update
// put /api/users/:id
// Not implemented


router.put('/:id',  (req, res) => {

  // pass in req.body instead to only update what's passed through
  User.update(req.body, {
    individualHooks: true,
    where: {
      id: req.params.id
    }
  })
    .then(dbUserData => {
      if (!dbUserData) {
        res.status(404).json({ message: `No user found with id: ${req.params.id}` });
        return;
      }
      res.json(dbUserData);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

////////////////////////////////////////////
// UR6 DELETE USER by ID
// deletes the specified user
// route: delete /api/users/:id
// Not implemented

router.delete('/:id', (req, res) => {
  User.destroy({
    where: {
      id: req.params.id
    }
  })
    .then(dbUserData => {
      if (!dbUserData) {
        res.status(404).json({ message: `No user found with id: ${req.params.id}` });
        return;
      }
      res.json(dbUserData);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

module.exports = router;
