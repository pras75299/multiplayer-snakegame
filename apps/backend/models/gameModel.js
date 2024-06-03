import mongoose from 'mongoose';

const gameSchema = new mongoose.Schema(
  {
    roomId: String,
    players: [String],
    state: {
      type: Map,
      of: String,
    },
  },
  { timestamps: true }
);

const Game = mongoose.model('Game', gameSchema);

export default Game;
