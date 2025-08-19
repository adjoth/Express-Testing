// server.ts

import express from "express";
const app = express();
const PORT = process.env.PORT ?? "9001";
const ENVIRONMENT = process.env.NODE_ENV || "development";

import type { ErrorResponse } from "./types"

// Tools
import {ChuckNorrisAPI} from "./util/ChuckNorrisAPI"

app.get('/users', function (req, res) {
  res.json({ users: 'allUsers' });
});

app.get('/users/3', function (req, res) {
  res.json({ user: 'user3' });
});

app.get('/joke', async (req, res) => {
  res.redirect('/joke/random')
});

app.get('/joke/random', async (req, res) => {
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
  res.json(joke)
});

if (ENVIRONMENT != 'test') {
  app.listen(PORT, () => {
    console.log(`Application is listening on port ${PORT}`)
  })
}


export default app;