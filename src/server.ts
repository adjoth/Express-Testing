// server.ts

import express from "express";
const app = express();
const PORT = process.env.PORT ?? "9001";
const ENVIRONMENT = process.env.NODE_ENV ?? "development";

// import type { Logger } from "./types"
// const cacheLogger: Logger = {
//   add: () => { cacheLogger.jokeCounter++ },
//   jokeCounter: 0
// }

import {cacheLogger} from "./types"
import {ChuckNorrisAPI} from "./util/ChuckNorrisAPI"

// Testing Only - Do not use
app.get('/ping', function (req, res) {
  res.send("pong!")
});

app.get('/joke',  (req, res, next) => {
  req.url = '/joke/random';
  next();
  //res.redirect('/joke/random')
});

app.get('/joke/random', async (req, res) => {
  cacheLogger.add()
  const joke = await ChuckNorrisAPI.randomJoke()
  res.json({joke : joke})
});

app.get('/joke/:category', async (req, res) => {
  const category = req.params.category // category
  // Get Joke by category
  const joke = await ChuckNorrisAPI.categoryJoke(category)
  if(typeof joke === 'string'){
    res.json({joke: joke})
    return
  }
  cacheLogger.add()
  res.json(joke)
});

app.get('/logs', (req, res) => {
  res.json({counter: cacheLogger.jokeCounter})
});

if (ENVIRONMENT != 'test') {
  app.listen(PORT, () => {
    console.log(`Application is listening on port ${PORT}`)
  })
}


export default app;