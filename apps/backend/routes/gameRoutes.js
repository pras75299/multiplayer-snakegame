import express from 'express';
import {
  getGameState,
  updateGameState,
} from '../controllers/gameController.js';

const router = express.Router();

router.get('/state', getGameState);
router.post('/state', updateGameState);

export default router;
