import 'dotenv/config';
import express from 'express';
import cors from 'cors';

import { getBooks } from './books';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// check for REST only endpoints
app.use(`/${process.env.API}/*`, (req, res, next) => {
  if (
    req.headers
    && (req.headers.accept === 'application/json'
      || req.headers['content-type'] === 'application/json')
  ) {
    next();
  } else {
    res.redirect('/');
  }
});

app.get(`/${process.env.API}/books/:search`, async (req, res) => {
  const {
    params: { search }
  } = req;
  res.send(await getBooks({ search }));
});

// catch all for unknown endpoints
app.all(`/${process.env.API}/*`, (req, res) => {
  res.status(422).send({ error: 'Invalid API' });
});

app.listen(process.env.PORT, () => {
  /* eslint-disable no-console */
  console.log(`Server listening on port ${process.env.PORT}`);
});
