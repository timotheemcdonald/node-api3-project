const express = require('express');

const Posts = require('./posts/postDb')
const Users = require('./users/userDb')

const userRouter = require('./users/userRouter')

const server = express();
server.use(express.json())
server.use(logger())

server.use("/api/users", userRouter)

server.get('/', (req, res) => {
  res.send(`<h2>Let's write some middleware!</h2>`);
});

//custom middleware

function logger(){
  return (req, res, next) => {
    req.requestTime = Date.now()
    console.log(` a ${req.method} request was made to ${req.url} at ${req.requestTime}`)

    next()
  }
}

module.exports = server;
