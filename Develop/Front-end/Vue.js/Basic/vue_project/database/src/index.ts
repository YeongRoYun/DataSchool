/// <reference path = "../node_modules/@types/custom_types.d.ts" />
import sqlite3 from 'sqlite3';
import express from 'express';
import cors from 'cors';

import get from './utils/get';
import TYPE from './utils/type';
import { DB } from './utils/type';
import initial from './utils/initial';


const PORT = 8000;

const app = express();
app.use(cors());
app.disable('x-powered-up');

const makePromise = (name:string) => new Promise((resolve:(arg0: DB)=>void, reject) => {
  const db = new sqlite3.Database(
    name, (err:Error) => {
      if(err) reject(err);
      else {
        resolve(db);
      }
    }
  )
});

makePromise(':memory:')
  .then((db:DB) => {
    console.log('Connected to the SQlite database:');
    initial(db, TYPE.about_me);
    initial(db, TYPE.resume);
    initial(db, TYPE.applications);
    initial(db, TYPE.notification);
    return db;
  })
  .then((db:DB) => {
    get(app, db);
  })
  .catch((err:Error) => console.log(err));

app.listen(PORT, () => {
    console.log(`Listening... ${PORT}`);
});

