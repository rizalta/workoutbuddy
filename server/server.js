import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import cors from 'cors';

import workoutRoutes from './routes/workouts.js';
import userRoutes from './routes/user.js'

dotenv.config();
const app = express();

app.use(express.json());
app.use(cors());

app.use('/api/workouts', workoutRoutes);
app.use('/api/user', userRoutes);

mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log(`connected to db and listening on port ${process.env.PORT}`);
    });
  })
  .catch((error) => {
    console.log(error);
  });