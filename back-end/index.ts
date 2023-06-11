import 'reflect-metadata';
import express from 'express';
import { createConnection } from 'typeorm';
import cors from 'cors';
import * as StoreController from './src/api/StoreController';
import UserController from './src/api/UserController';

const PORT = 3000;

async function startup() {
  await createConnection();
  const app = express();

  app.use(express.json());
  app.use(cors());

  app.post('/store', StoreController.save);
  app.get('/store', StoreController.getAll);

  const userController = new UserController(); 
  app.post('/register', userController.register);
  app.post('/login', userController.login); 
  app.get('/user/:id', userController.getUserById)

  app.listen(PORT, () => {
    console.log('App running on port ' + PORT);
  });
}

startup();
