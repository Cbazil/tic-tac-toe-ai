import { defineStore } from 'pinia'

export const useGameStore = defineStore('game', {
  state: () => {
    return { 
      squares: [
        { id: 'sq1', val: '' },
        { id: 'sq2', val: '' },
        { id: 'sq3', val: '' },
        { id: 'sq4', val: '' },
        { id: 'sq5', val: '' },
        { id: 'sq6', val: '' },
        { id: 'sq7', val: '' },
        { id: 'sq8', val: '' },
        { id: 'sq9', val: '' },
      ],
      gameOver: false,
      playerFirst: true,
      playerTurn: true,
      playerPlayed: false,
      playerPiece: 'tic',
      ggTop: false,
      ggLeft: false,
      ggRight: false,
      ggBottom: false,
      ggVert: false,
      ggHori: false,
      ggDiright: false,
      ggDileft: false
    }
  },
  actions: {
    togglePlay(value) {
      this.gameOver = value
    },
    updateTurn(value) {
      this.playerTurn = value;
    },
    updateSquares(value) {
      this.squares = value;
    },
    handlePlayerMove(move) {
      const idx = this.squares.findIndex(square => square.id === move);
      this.squares[idx].val = this.playerPiece;
    },
    toggleTop() {
      this.ggTop = !this.ggTop;
    },
    toggleLeft() {
      this.ggLeft = !this.ggLeft;
    },
    toggleRight() {
      this.ggRight = !this.ggRight;
    },
    toggleVert() {
      this.ggVert = !this.ggVert;
    },
    toggleBottom() {
      this.ggBottom = !this.ggBottom;
    },
    toggleHori() {
      this.ggHori = !this.ggHori;
    },
    toggleDiright() {
      this.ggDiright = !this.ggDiright;
    },
    toggleDileft() {
      this.ggDileft = !this.ggDileft;
    }
  },
})