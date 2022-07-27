/// <reference path = "../node_modules/@types/custom_types.d.ts" />
import sqlite3 from 'sqlite3';
import express from 'express';
import cors from 'cors';
import path from 'path';

import get from './utils/get';
import TYPE from './utils/type';
import initial from './utils/initial';


const PORT = 8000;

const app = express();
app.use(cors());
app.disable('x-powered-up');


const db = new sqlite3.Database(
    ':memory:',
    (err:Error) => {
      if (err) {
        return console.error(err.message);
      }
      console.log('Connected to the in-memory SQlite database.');
      initial(db, TYPE.about_me);
      initial(db, TYPE.resume);
      initial(db, TYPE.applications);
});

app.listen(PORT, () => {
    console.log(`Listening... ${PORT}`);
});

get(app, db);

