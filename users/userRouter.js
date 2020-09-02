const express = require('express');

const router = express.Router();
const Users = require('./userDb')


router.post('/', validateUser(), (req, res) => {
  // do your magic!
  const newUser = req.body
  Users.insert(newUser)
    .then(user => {
      res.status(201).json(user)
    })
    .catch(error => {
      res.status(500).json({ error: "There was an error while posting the user." })
    })
});

router.post('/:id/posts', validatePost(), (req, res) => {
  // do your magic!
  const { id } = req.params
  const newPost = req.body
  const postText = newPost.text

  Users.getById(id)
    .then(post => {
      Users.insert(newPost)
      res.status(201).json(post)
    })
    .catch(error => {
      res.status(500).json({ error: "There was an error while saving the post to the database" })
    })
});

router.get('/', (req, res) => {
  // do your magic!
  Users.get(req.query)
    .then(user => {
      res.status(200).json(user)
    })
    .catch(error => {
      res.status(500).json({ error: "There was an error while retrieving the userbase." })
    })
});

router.get('/:id', validateUserId('/:id'), (req, res) => {
  // do your magic!
  const { id } = req.params
  Users.getById(id)

    .then(user => {
      res.status(200).json(user)
    })
    .catch(error => {
      res.status(500).json({ error: "There was an error while retrieving the user information." })
    })
});

router.get('/:id/posts', (req, res) => {
  // do your magic!
  const { id } = req.params

  Users.getUserPosts(id)
    .then(post => {

      res.status(201).json(post)
    })
    .catch(error => {
      res.status(500).json({ error: "There was an error retrieving the user's posts." })
    })

  // const {id} = req.params
  // const posts = Users.getUserPosts(id)
  // if(posts){
  //   res.status(200).json({data : posts})
  // }
});

router.delete('/:id', (req, res) => {
  // do your magic!
  const { id } = req.params
  Users.remove(id)
    .then(count => {
      if (count > 0) {
        res.status(200).json({ message: "The user has been deleted." })
      }
    })
    .catch(error => {
      res.status(500).json({ error: "The user could not be deleted." })
    })
});

router.put('/:id', (req, res) => {
  // do your magic!
  changes = req.body
  const { id } = req.params
  Users.update(id, changes)
    .then(user => {
      res.status(200).json(user)
    })
    .catch(error => {
      res.status(500).json({ error: "User info could not be changed." })
    })
});

//custom middleware

function validateUserId(id) {
  return function (req, res, next) {
    // do your magic!
    if (id = req.params.id) {
      let id = req.user;
      next();
    } else {
      res.status(404).json({ message: "invalid user id" })
      next();
    }

  }
}

function validateUser() {
  return function (req, res, next) {
    // do your magic!
    let username = req.body
    if (!username) {
      res.status(400).json({ message: "missing user data" })
    } else if (!username.name) {
      res.status(400).json({ message: "missing required name field" })
    } else {
      next()
    }
  }
}

function validatePost() {
  return function (req, res, next) {
    // do your magic!
    let postData = req.body
    if (!postData) {
      res.status(400).json({ message: "missing post data" })
    } else if (!username.text) {
      res.status(400).json({ message: "missing required text field" })
    } else {
      next()
    }
  }
}

module.exports = router;
