import express from 'express';
import { getWorkouts, getWorkout, createWorkout, deleteWorkout, updateWorkout } from '../controllers/workoutController.js';
import requireAuth from '../middlewares/requireAuth.js';

const router = express.Router();

router.use(requireAuth);

router.get('/', getWorkouts);

router.get('/:id', getWorkout);

router.post('/', createWorkout);

router.delete('/:id', deleteWorkout);

router.patch('/:id', updateWorkout);

export default router;