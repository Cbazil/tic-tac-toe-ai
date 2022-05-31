<template>
  <div id="game">
    <div id="tictactoe">
      <div id="grid">
        <div id="sq1" class="squares" @click.once="move($event)" :key="keyOne">
          <img class="pieces" v-if="squares[0].val === 'tic'" src="../assets/cross.png">
          <img class="pieces"  v-if="squares[0].val === 'tac'" src="../assets/circle.png">
        </div>
        <div id="sq2" class="squares"  @click.once="move($event)" :key="keyTwo">
          <img class="pieces" v-if="squares[1].val === 'tic'" src="../assets/cross.png">
          <img class="pieces"  v-if="squares[1].val === 'tac'" src="../assets/circle.png">
        </div>
        <div id="sq3" class="squares"  @click.once="move($event)" :key="keyThree">
          <img class="pieces" v-if="squares[2].val === 'tic'" src="../assets/cross.png">
          <img class="pieces"  v-if="squares[2].val === 'tac'" src="../assets/circle.png">
        </div>
        <div id="sq4" class="squares"  @click.once="move($event)" :key="keyFour">
          <img class="pieces" v-if="squares[3].val === 'tic'" src="../assets/cross.png">
          <img class="pieces"  v-if="squares[3].val === 'tac'" src="../assets/circle.png">
        </div>
        <div id="sq5" class="squares"  @click.once="move($event)" :key="keyFive">
          <img class="pieces" v-if="squares[4].val === 'tic'" src="../assets/cross.png">
          <img class="pieces"  v-if="squares[4].val === 'tac'" src="../assets/circle.png">
        </div>
        <div id="sq6" class="squares"  @click.once="move($event)" :key="keySix">
          <img class="pieces" v-if="squares[5].val === 'tic'" src="../assets/cross.png">
          <img class="pieces"  v-if="squares[5].val === 'tac'" src="../assets/circle.png">
        </div>
        <div id="sq7" class="squares"  @click.once="move($event)" :key="keySeven">
          <img class="pieces" v-if="squares[6].val === 'tic'" src="../assets/cross.png">
          <img class="pieces"  v-if="squares[6].val === 'tac'" src="../assets/circle.png">
        </div>
        <div id="sq8" class="squares"  @click.once="move($event)" :key="keyEight">
          <img class="pieces" v-if="squares[7].val === 'tic'" src="../assets/cross.png">
          <img class="pieces"  v-if="squares[7].val === 'tac'" src="../assets/circle.png">
        </div>
        <div id="sq9" class="squares"  @click.once="move($event)" :key="keyNine">
          <img class="pieces" v-if="squares[8].val === 'tic'" src="../assets/cross.png">
          <img class="pieces" v-if="squares[8].val === 'tac'" src="../assets/circle.png">
        </div>
      </div>
      <div id="winner-poles">
        <div id="ggTop" class="ruler" v-if="ggTop"></div>
        <div id="ggLeft" class="ruler" v-if="ggLeft"></div>
        <div id="ggRight" class="ruler" v-if="ggRight"></div>
        <div id="ggBottom" class="ruler" v-if="ggBottom"></div>
        <div id="ggVert" class="ruler" v-if="ggVert"></div>
        <div id="ggHori" class="ruler" v-if="ggHori"></div>
        <div id="ggDiright" class="ruler" v-if="ggDiright"></div>
        <div id="ggDileft" class="ruler" v-if="ggDileft"></div>
      </div>
      <div id="game-ui">
        <h2 v-if="!gameOver">Challenge me?</h2>
        <h2 v-if="gameOver">Good Game!</h2>
        <span v-if="!gameOver && !store.playerPlayed"><button :class="{turn: store.playerFirst}" @click="playerfirst" size="15px" class="control-btn">1st</button><button :class="{turn: !store.playerFirst}"  @click.once="aiFirst" :key="keyAI" size="15px" class="control-btn">2nd</button></span>
        <span v-if="gameOver"><button :class="{turn: !gameOver}" @click="resetGame" size="15px" class="control-btn" outline>Play again</button></span>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, computed   } from 'vue';

import { useGameStore } from '../store/game.js'
export default {
  setup () {
    const store = useGameStore()

    let squares = computed(() => { return store.squares });
    let gameOver = computed(() => { return store.gameOver })

    let ggTop = computed(() => { return store.ggTop });
    let ggLeft = computed(() => { return store.ggLeft});
    let ggRight = computed(() => { return store.ggRight});
    let ggBottom = computed(() => { return store.ggBottom});
    let ggVert = computed(() => { return store.ggVert});
    let ggHori = computed(() => { return store.ggHori});
    let ggDiright = computed(() => { return store.ggDiright});
    let ggDileft = computed(() => { return store.ggDileft});

    let keyOne = ref('1');
    let keyTwo = ref('2');
    let keyThree = ref('3');
    let keyFour = ref('4');
    let keyFive = ref('5');
    let keySix = ref('6');
    let keySeven = ref('7');
    let keyEight = ref('8');
    let keyNine = ref('9');
    let keyAI = ref('gg');

    const aiFirst = () => {
      store.playerPiece = 'tac'
      handleAIMove(store.squares)
      store.playerFirst = false
      store.updateTurn(true)
    }

    const playerfirst = () => {
      store.playerFirst = true
      store.playerPlayed = false
      resetGame()
    }

    const playerTurn = computed(() => { return store.playerTurn })
    const playerPiece = computed(() => { return store.playerPiece })

    const randumb = (arr1, arr2) => {
      let percent = Math.ceil(Math.random() * 100);
      if (percent > 70) {
        let ranNum = Math.floor(Math.random() * arr2.length);
        return arr2[ranNum];
      } else {
        let ranNum = Math.floor(Math.random() * arr1.length);
        return arr1[ranNum];
      }
    };

    const handleAIMove = (sqrs) => {
      let sq1 = sqrs[0].val,
      sq2 = sqrs[1].val,
      sq3 = sqrs[2].val,
      sq4 = sqrs[3].val,
      sq5 = sqrs[4].val,
      sq6 = sqrs[5].val,
      sq7 = sqrs[6].val,
      sq8 = sqrs[7].val,
      sq9 = sqrs[8].val;

      if (sq1 && sq2 && sq3 && sq4 && sq5 && sq6 && sq7 && sq8 && sq9) {
        store.togglePlay(true)
      } else {
        // Player Plays middle
        if(sq1 == '' && sq2 == '' && sq3 == '' && sq4 == '' && sq5 == 'tic' && sq6 == '' && sq7 == '' && sq8 == '' && sq9 == ''){
          let move = randumb([sqrs[0], sqrs[8]], [sqrs[1], sqrs[2], sqrs[3], sqrs[7]]);
          move.val = playerPiece.value === 'tac' ? 'tic' : 'tac';
        }
        
        // Phase 1 good move
        else if(sq1 == 'tac' && sq2 == '' && sq3 == 'tic' && sq4 == '' && sq5 == 'tic' && sq6 == '' && sq7 == '' && sq8 == '' && sq9 == '') {
          let move = randumb([sqrs[6]], [sqrs[3], sqrs[7]]);
          move.val = playerPiece.value === 'tac' ? 'tic' : 'tac';
        }
        else if(sq1 == '' && sq2 == '' && sq3 == '' && sq4 ==  '' && sq5 == 'tic' && sq6 == '' && sq7 == 'tic' && sq8 == '' && sq9 == 'tac'){
          let move = randumb([sqrs[2]], [sqrs[1], sqrs[5]]);
          move.val = playerPiece.value === 'tac' ? 'tic' : 'tac';
        }
        else if(sq1 == '' && sq2 == '' && sq3 == 'tac' && sq4 == '' && sq5 == 'tic' && sq6 == '' && sq7 == '' && sq8 == '' && sq9 == 'tic'){
          let move = randumb([sqrs[0]], [sqrs[1], sqrs[3]]);
          move.val = playerPiece.value === 'tac' ? 'tic' : 'tac';
        }
        // Phase 1 Bad move
        else if(sq1 == '' && sq2 == 'tac' && sq3 == 'tic' && sq4 == '' && sq5 == 'tic' && sq6 == '' && sq7 == '' && sq8 == '' && sq9 == ''){
          let move = randumb([sqrs[6]], [sqrs[6], sqrs[3], sqrs[7]]);
          move.val = playerPiece.value === 'tac' ? 'tic' : 'tac';
        } 
    
        else if(sq1 == '' && sq2 == '' && sq3 == '' && sq4 == '' && sq5 == 'tic' && sq6 == '' && sq7 == 'tic' && sq8 == 'tac' && sq9 == ''){
          let move = randumb([sqrs[2]], [sqrs[1], sqrs[2], sqrs[5]]);
          move.val = playerPiece.value === 'tac' ? 'tic' : 'tac';
        }
        else if(sq1 == 'tic' && sq2 == '' && sq3 == '' && sq4== 'tac' && sq5 == 'tic' && sq6 == '' && sq7 == '' && sq8 == '' && sq9 == ''){
          let move = randumb([sqrs[8]], [sqrs[5], sqrs[7], sqrs[8]]);
          move.val = playerPiece.value === 'tac' ? 'tic' : 'tac';
        }
        // Player Plays any corner
        // first corner
        else if(sq1 == 'tic' && sq2 == '' && sq3 == '' && sq4 == '' && sq5 == '' && sq6 == '' && sq7 == '' && sq8 == '' && sq9 == ''){
          let move = randumb([sqrs[4]], [sqrs[1], sqrs[2], sqrs[3], sqrs[4], sqrs[6], sqrs[8]]);
          move.val = playerPiece.value === 'tac' ? 'tic' : 'tac';
        }
        else if(sq1 == 'tic' && sq2 == '' && sq3 == '' && sq4 == '' && sq5 == 'tac' && sq6 == '' && sq7 == 'tic' && sq8 == '' && sq9 == ''){
          let move = randumb([sqrs[3]], [sqrs[1], sqrs[3], sqrs[5], sqrs[7]]);
            move.val = playerPiece.value === 'tac' ? 'tic' : 'tac';
        }
        else if(sq1 == 'tic' && sq2 == '' && sq3 == 'tic' && sq4 == '' && sq5 == 'tac' && sq6 == '' && sq7 == '' && sq8 == '' && sq9 == ''){
          let move = randumb([sqrs[1]], [sqrs[1], sqrs[3], sqrs[5], sqrs[7]]);
          move.val = playerPiece.value === 'tac' ? 'tic' : 'tac';
        }
        // second corner
        else if(sq1 == '' && sq2 == '' && sq3 == 'tic' && sq4 == '' && sq5 == '' && sq5 == '' && sq6 == '' && sq7 == '' && sq8 == '' && sq9 == ''){
          let move = randumb([sqrs[4]], [sqrs[0], sqrs[1], sqrs[4], sqrs[5], sqrs[6], sqrs[8]]);
          move.val = playerPiece.value === 'tac' ? 'tic' : 'tac';
        }
        else if(sq1 == '' && sq2 == '' && sq3 == 'tic' && sq4 == '' && sq5 == 'tac' && sq6 == '' && sq7 == '' && sq8 == '' && sq9 == 'tic'){
          let move = randumb([sqrs[5]], [sqrs[1], sqrs[3], sqrs[5], sqrs[7]]);
          move.val = playerPiece.value === 'tac' ? 'tic' : 'tac';
        }
        // third corner 
        else if(sq1 == '' && sq2 == '' && sq3 == '' && sq4 == '' && sq5 == '' && sq6 == '' && sq7 == 'tic' && sq8 == '' && sq9 == ''){
          let move = randumb([sqrs[4]], [sqrs[0], sqrs[2], sqrs[3], sqrs[4], sqrs[7], sqrs[8]]);
          move.val = playerPiece.value === 'tac' ? 'tic' : 'tac';
        } 
        else if(sq1 == '' && sq2 == '' && sq3 == '' && sq4 == '' && sq5 == 'tac' && sq6 == '' && sq7 == 'tic' && sq8 == '' && sq9 == 'tic'){
          let move = randumb([sqrs[7]], [sqrs[1], sqrs[3], sqrs[5], sqrs[7]]);
          move.val = playerPiece.value === 'tac' ? 'tic' : 'tac';
        }
        // fourth corner 
        else if(sq1 == '' && sq2 == '' && sq3 == '' && sq4 == '' && sq5 == '' && sq6 == '' && sq7 == '' && sq8 == '' && sq9 == 'tic'){
          let move = randumb([sqrs[4]], [sqrs[0], sqrs[2], sqrs[4], sqrs[5], sqrs[6], sqrs[7]]);
          move.val = playerPiece.value === 'tac' ? 'tic' : 'tac';
        }
        // Player plays sides 
        // top side
        else if(sq1 == '' && sq2 == 'tic' && sq3 == '' && sq4 == '' && sq5 == '' && sq6 == '' && sq7 == '' && sq8 == '' && sq9 == ''){
          let move = randumb([sqrs[4]], [sqrs[0], sqrs[2], sqrs[4]]);
          move.val = playerPiece.value === 'tac' ? 'tic' : 'tac';
        }
        // left side
        else if(sq1 == '' && sq2 == '' && sq3 == '' && sq4 == 'tic' && sq5 == '' && sq6 == '' && sq7 == '' && sq8 == '' && sq9 == ''){
          let move = randumb([sqrs[4]], [sqrs[0], sqrs[4], sqrs[6]]);
          move.val = playerPiece.value === 'tac' ? 'tic' : 'tac';
        } 
        // right side
        else if(sq1 == '' && sq2 == '' && sq3 == '' && sq4 == '' && sq5 == '' && sq6 == 'tic' && sq7 == '' && sq8 == '' && sq9 == ''){
          let move = randumb([sqrs[4]], [sqrs[2], sqrs[4], sqrs[8]]);
          move.val = playerPiece.value === 'tac' ? 'tic' : 'tac';
        }
        // bottom side 
        else if(sq1 == '' && sq2 == '' && sq3 == '' && sq4 == '' && sq5 == '' && sq6 == '' && sq7 == '' && sq8 == 'tic' && sq9 == ''){
          let move = randumb([sqrs[4]], [sqrs[4], sqrs[6], sqrs[8]]);
          move.val = playerPiece.value === 'tac' ? 'tic' : 'tac';
        }
        // Winning moves
        // top side
        else if(sq1 == '' && sq2 == 'tic' && sq3 == 'tic' || sq1 == '' && sq2 == 'tac' && sq3 == 'tac'){
          let move = randumb([sqrs[0]], [sqrs[0]]);
          move.val = playerPiece.value === 'tac' ? 'tic' : 'tac';
        }
        else if(sq1 == 'tic' && sq2 == '' && sq3 == 'tic' || sq1 == 'tac' && sq2 == '' && sq3 == 'tac'){
          let move = randumb([sqrs[1]], [sqrs[1]]);
          move.val = playerPiece.value === 'tac' ? 'tic' : 'tac';
        }
        else if(sq1 == 'tic' && sq2 == 'tic' && sq3 == '' || sq1 == 'tac' && sq2 == 'tac' && sq3 == ''){
          let move = randumb([sqrs[2]],[sqrs[2]]);
          move.val = playerPiece.value === 'tac' ? 'tic' : 'tac';
        }
        // left side
        else if(sq1 == '' && sq4 == 'tic' && sq7 == 'tic' || sq1 == '' && sq4 == 'tac' && sq7 == 'tac'){
          let move = randumb([sqrs[0]], [sqrs[0]]);
          move.val = playerPiece.value === 'tac' ? 'tic' : 'tac';
        }
        else if(sq1 == 'tic' && sq4 == '' && sq7 == 'tic' || sq1 == 'tac' && sq4 == '' && sq7 == 'tac'){
          let move = randumb([sqrs[3]], [sqrs[3]]);
          move.val = playerPiece.value === 'tac' ? 'tic' : 'tac';
        }
        else if(sq1 == 'tic' && sq4 == 'tic' && sq7 == '' || sq1 == 'tac' && sq4 == 'tac' && sq7 == ''){
          let move = randumb([sqrs[6]], [sqrs[6]]);
          move.val = playerPiece.value === 'tac' ? 'tic' : 'tac';
        }
        // right side 
        else if(sq3 == '' && sq6 == 'tic' && sq9 == 'tic' || sq3 == '' && sq6 == 'tac' && sq9 == 'tac'){
          let move = randumb([sqrs[2]], [sqrs[2]]);
          move.val = playerPiece.value === 'tac' ? 'tic' : 'tac';
        }
        else if(sq3 == 'tic' && sq6 == '' && sq9 == 'tic' || sq3 == 'tac' && sq6 == '' && sq9 == 'tac'){
          let move = randumb([sqrs[5]], [sqrs[5]]);
          move.val = playerPiece.value === 'tac' ? 'tic' : 'tac';
        }
        else if(sq3 == 'tic' && sq6 == 'tic' && sq9 == '' || sq3 == 'tac' && sq6 == 'tac' && sq9 == ''){
          let move = randumb([sqrs[8]],[sqrs[8]]);
          move.val = playerPiece.value === 'tac' ? 'tic' : 'tac';
        }
        // bottom side 
        else if(sq7 == '' && sq8 == 'tic' && sq9 == 'tic' || sq7 == '' && sq8 == 'tac' && sq9 == 'tac'){
          let move = randumb([sqrs[6]], [sqrs[6]]);
          move.val = playerPiece.value === 'tac' ? 'tic' : 'tac';
        }
        else if(sq7 == 'tic' && sq8 == '' && sq9 == 'tic' || sq7 == 'tac' && sq8 == '' && sq9 == 'tac'){
          let move = randumb([sqrs[7]], [sqrs[7]]);
          move.val = playerPiece.value === 'tac' ? 'tic' : 'tac';
        }
        else if(sq7 == 'tic' && sq8 == 'tic' && sq9 == '' || sq7 == 'tac' && sq8 == 'tac' && sq9 == ''){
          let move = randumb([sqrs[8]], [sqrs[8]]);
          move.val = playerPiece.value === 'tac' ? 'tic' : 'tac';
        }
        // verticle 
        else if(sq2 == '' && sq5 == 'tic' && sq8 == 'tic' || sq2 == '' && sq5 == 'tac' && sq8 == 'tac'){
          let move = randumb([sqrs[1]], [sqrs[1]]);
          move.val = playerPiece.value === 'tac' ? 'tic' : 'tac';
        }
        else if(sq2 == 'tic' && sq5 == '' && sq8 == 'tic' || sq2 == 'tac' && sq5 == '' && sq8 == 'tac'){
          let move = randumb([sqrs[4]], [sqrs[4]]);
          move.val = playerPiece.value === 'tac' ? 'tic' : 'tac';
        }
        else if(sq2 == 'tic' && sq5 == 'tic' && sq8 == '' || sq2 == 'tac' && sq5 == 'tac' && sq8 == ''){
          let move = randumb([sqrs[7]], [sqrs[7]]);
          move.val = playerPiece.value === 'tac' ? 'tic' : 'tac';
        }
        // horizontal
        else if(sq4 == '' && sq5 == 'tic' && sq6 == 'tic' || sq4 == '' && sq5 == 'tac' && sq6 == 'tac'){
          let move = randumb([sqrs[3]], [sqrs[3]]);
          move.val = playerPiece.value === 'tac' ? 'tic' : 'tac';
        }
        else if(sq4 == 'tic' && sq5 == '' && sq6 == 'tic' || sq4 == 'tac' && sq5 == '' && sq6 == 'tac'){
          let move = randumb([sqrs[4]], [sqrs[4]]);
          move.val = playerPiece.value === 'tac' ? 'tic' : 'tac';
        }
        else if(sq4 == 'tic' && sq5 == 'tic' && sq6 == '' || sq4 == 'tac' && sq5 == 'tac' && sq6 == ''){
          let move = randumb([sqrs[5]], [sqrs[5]]);
          move.val = playerPiece.value === 'tac' ? 'tic' : 'tac';
        }
        // Diagonal right
        else if(sq1 == '' && sq5 == 'tic' && sq9 == 'tic' || sq1 == '' && sq5 == 'tac' && sq9 == 'tac'){
          let move = randumb([sqrs[0]], [sqrs[0]]);
          move.val = playerPiece.value === 'tac' ? 'tic' : 'tac';
        }
        else if(sq1 == 'tic' && sq5 == '' && sq9 == 'tic' || sq1 == 'tac' && sq5 == '' && sq9 == 'tac'){
          let move = randumb([sqrs[4]], [sqrs[4]]);
          move.val = playerPiece.value === 'tac' ? 'tic' : 'tac';
        }
        else if(sq1 == 'tic' && sq5 == 'tic' && sq9 == '' || sq1 == 'tac' && sq5 == 'tac' && sq9 == ''){
          let move = randumb([sqrs[8]], [sqrs[8]]);
          move.val = playerPiece.value === 'tac' ? 'tic' : 'tac';
        }
        // Diagonal left
        else if(sq3 == '' && sq5 == 'tic' && sq7 == 'tic' || sq3 == '' && sq5 == 'tac' && sq7 == 'tac'){
          let move = randumb([sqrs[2]], [sqrs[2]]);
          move.val = playerPiece.value === 'tac' ? 'tic' : 'tac';
        }
        else if(sq3 == 'tic' && sq5 == '' && sq7 == 'tic' || sq3 == 'tac' && sq5 == '' && sq7 == 'tac'){
          let move = randumb([sqrs[4]], [sqrs[4]]);
          move.val = playerPiece.value === 'tac' ? 'tic' : 'tac';
        }
        else if(sq3 == 'tic' && sq5 == 'tic' && sq7 == '' || sq3 == 'tac' && sq5 == 'tac' && sq7 == ''){
          let move = randumb([sqrs[6]], [sqrs[6]]);
          move.val = playerPiece.value === 'tac' ? 'tic' : 'tac';
          }
          // AI plays first 
          else if(sq1 == '' && sq2 == '' && sq3 == '' && sq4 == '' && sq5 == '' && sq6 == '' && sq7 == '' && sq8 == '' && sq9 == ''){
            let move = randumb([sqrs[4], sqrs[0], sqrs[2], sqrs[6], sqrs[8]], [sqrs[0], sqrs[1], sqrs[3], sqrs[5], sqrs[7], sqrs[2], sqrs[6], sqrs[8]]);
            move.val = playerPiece.value === 'tac' ? 'tic' : 'tac';
          }
          else {
            randomSqr(sqrs);
          }
        }
      };
      const winnerFound = (squares) => {
        let sq1 = squares[0].val,
        sq2 = squares[1].val,
        sq3 = squares[2].val,
        sq4 = squares[3].val,
        sq5 = squares[4].val,
        sq6 = squares[5].val,
        sq7 = squares[6].val,
        sq8 = squares[7].val,
        sq9 = squares[8].val;

        // Check win
        if((sq1 == 'tic' && sq2 == 'tic' && sq3 == 'tic') || (sq1 == 'tac' && sq2 == 'tac' && sq3 == 'tac')) {
          store.toggleTop()
          store.togglePlay(true)
        } 
        if((sq1 == 'tic' && sq4 == 'tic' && sq7 == 'tic') || (sq1 == 'tac' && sq4 == 'tac' && sq7 == 'tac')){
          store.toggleLeft()
          store.togglePlay(true)
        } 
        if((sq3 == 'tic' && sq6 == 'tic' && sq9 == 'tic') || (sq3 == 'tac' && sq6 == 'tac' && sq9 == 'tac')){
          store.toggleRight()
          store.togglePlay(true)
        } 
        if((sq7 == 'tic' && sq8 == 'tic' && sq9 == 'tic') || (sq7 == 'tac' && sq8 == 'tac' && sq9 == 'tac')){
          store.toggleBottom()
          store.togglePlay(true)
        } 
        if((sq2 == 'tic' && sq5 == 'tic' && sq8 == 'tic') || (sq2 == 'tac' && sq5 == 'tac' && sq8 == 'tac')){
          store.toggleVert()
          store.togglePlay(true)
        } 
        if((sq4 == 'tic' && sq5 == 'tic' && sq6 == 'tic') || (sq4 == 'tac' && sq5 == 'tac' && sq6 == 'tac')){
          store.toggleHori()
          store.togglePlay(true)
        } 
        if((sq1 == 'tic' && sq5 == 'tic' && sq9 == 'tic') || (sq1 == 'tac' && sq5 == 'tac' && sq9 == 'tac')){
          store.toggleDiright()
          store.togglePlay(true)
        } 
        if((sq3 == 'tic' && sq5 == 'tic' && sq7 == 'tic') || (sq3 == 'tac' && sq5 == 'tac' && sq7 == 'tac')){
          store.toggleDileft()
          store.togglePlay(true)
        }
      };
      const resetGame = async () => {
        store.updateSquares(
          [
            { id: 'sq1', val: '' },
            { id: 'sq2', val: '' },
            { id: 'sq3', val: '' },
            { id: 'sq4', val: '' },
            { id: 'sq5', val: '' },
            { id: 'sq6', val: '' },
            { id: 'sq7', val: '' },
            { id: 'sq8', val: '' },
            { id: 'sq9', val: '' },
          ]
        )
        store.playerPiece = 'tic'
        store.togglePlay(false)
        store.updateTurn(true)
        store.ggTop = false
        store.ggBottom = false
        store.ggLeft= false
        store.ggRight = false
        store.ggVert = false
        store.ggHori = false
        store.ggDileft = false
        store.ggDiright = false
        keyOne.value = keyOne.value + '1'
        keyTwo.value = keyTwo.value + '2'
        keyThree.value = keyThree.value + '3'
        keyFour.value = keyFour.value + '4'
        keyFive.value = keyFive.value + '5'
        keySix.value = keySix.value + '6'
        keySeven.value = keySeven.value + '7' 
        keyEight.value = keyEight.value + '8'
        keyNine.value = keyNine.value + '9'
        keyAI.value = keyAI.value + 'gg'

        store.playerPlayed = false,
        store.playerFirst = true
      }
      const move = async (event) => {
        if (playerTurn.value && event.currentTarget.children.length == 0 && (gameOver.value == false)) {
          store.playerPlayed = true
          store.handlePlayerMove(event.currentTarget.id)
          winnerFound(store.squares)
          if (!gameOver.value) {
            handleAIMove(store.squares)
            winnerFound(store.squares)
          }
          if(squares.value[0].val.length > 0
          && squares.value[1].val.length > 0
          && squares.value[2].val.length > 0
          && squares.value[3].val.length > 0
          && squares.value[4].val.length > 0
          && squares.value[5].val.length > 0
          && squares.value[6].val.length > 0
          && squares.value[7].val.length > 0
          && squares.value[8].val.length > 0
          ) {
            store.togglePlay(true)
          }
          // Update squares
          if (!gameOver.value) {
            store.updateTurn(true)
          }
        } else {
          var audio = await new Audio('http://soundbible.com/mp3/Air Plane Ding-SoundBible.com-496729130.mp3')
          audio.play();
        }
      }
    return {
      squares,
      ggTop,
      ggLeft,
      ggRight,
      ggBottom,
      ggVert,
      ggHori,
      ggDiright,
      ggDileft,
      keyOne,
      keyTwo,
      keyThree,
      keyFour,
      keyFive,
      keySix,
      keySeven,
      keyEight,
      keyNine,
      keyAI,
      move,
      store,
      gameOver,
      aiFirst,
      playerfirst,
      playerTurn,
      resetGame 
    }
  }
}
</script>
<style lang="scss" scoped>
#game {
  display: flex;
  justify-content: center;
  #tictactoe {
    margin: 40px 0px;
    width: 305px;
    h2 {
      font-size: 20px;
      margin-bottom: 40px;
    }

    #game-ui {
      margin: 40px 0px;
    }
    .pieces {
      width: 55px;
      height: 55px;
      margin: 0px;
    }
    .squares {
      max-width: 75.2px;
      max-height: 75.2px;
      width: auto;
      height: auto;
      cursor: pointer;
      background-color: #6ca1ed;
      margin: 0;
      padding: 12%;
    }
    #grid {
      position: relative;
      display: grid;
      background: #fff;
      margin-top: -15px !important;
      grid-template-columns: 1fr 1fr 1fr;
      grid-gap: 4px;
    }
    #winner-poles {
      position: relative;
      // top: 0;
      z-index: 1;
    }
    .squares {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 120px;
      height: 120px;
    }

    .ruler {
      position: absolute;
      margin-top: -154px;
      width: 305px;
      height: 5px;
      background-color: yellowgreen;
    }

    #ggRight, #ggLeft, #ggVert {
      transform: rotate(90deg);
    }

    #ggTop {
      top: -102px;
    }

    #ggBottom {
      top: 102px;
    }

    #ggLeft {
      left: -102px;
    }
    #ggRight {
      left: 102px;
    }

    #ggDiright {
      transform: rotate(45deg) scale(1.3, 1);
    }

    #ggDileft {
      transform: rotate(-45deg) scale(1.3, 1);
    }


    #game-ui {
      position: relative;
      display: block;
      text-align: center;
    }
    .control-btn {
      cursor: pointer;
      margin-top: -15px;
      background: #6ca1ed;
      border: 2px solid #fff;
      border-radius: 10px;
    }

    .control-btn:hover {
      color: #6ca1ed;
      background: white;
    }

    button {
      padding: 5px 25px;
      margin: 0 5px;
      color: #fff;
      font-family: 'Montserrat Alternates', sans-serif;
      font-size: 24px;
    }
  }
}

// Laptop
@media (min-width: 768px) {
  #game {
    #tictactoe {
      width: 420px !important;
    }
    .pieces {
      width: 100px !important;
      height: 100px !important;
    }
    .squares {
      max-width: 180px !important;
      max-height: 180px !important;
      padding: 4% !important;
    }
    #grid {
      grid-gap: 16px !important;
    }
    .ruler {
      margin-top: -222px !important;
      width: 420px !important;
      height: 16px !important;
    }
    #ggTop {
      top: -142px !important;
    }

    #ggBottom {
      top: 142px !important;
    }

    #ggLeft {
      left: -142px !important;
    }
    #ggRight {
      left: 142px !important;
    }
  }
}

</style>