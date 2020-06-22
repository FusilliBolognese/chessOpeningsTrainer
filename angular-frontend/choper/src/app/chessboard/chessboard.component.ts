import { Component, OnInit } from '@angular/core';
import * as cgTypes from 'chessground/types';
import { State } from 'chessground/state';
import { Config } from 'chessground/config';

const chessgroundjs = require('chessground').Chessground;
const chessjs = require('chess.js');

@Component({
  selector: 'app-chessboard',
  templateUrl: './chessboard.component.html',
  styleUrls: ['./chessboard.component.css']
})
export class ChessboardComponent implements OnInit {
  game: any;
  board: any;
  promotions = [];
  showThreats = true;

  constructor() {
    this.game = chessjs();
  }

  ngOnInit(): void {
    const boardConfig: Config = {
      fen: this.game.fen(),
      coordinates: true,
      movable: {
        free: false,
        color: this.toColor(),
        dests: this.possibleMoves(),
        // events: { after: this.onBoardAfterMove() }
      },
      events: {
        move: this.onBoardAfterMove()
      }
    };
    this.board = chessgroundjs(document.getElementById('ground'), boardConfig);
    console.log(JSON.stringify(this.game));
  }

  toColor(): cgTypes.Color {
    return (this.game.turn() === 'w') ? 'white' : 'black';
  }

  boardState(): string {
    return JSON.stringify(this.board.state.movable.dests);
  }

  possibleMoves() {
    const dests = {};
    this.game.SQUARES.forEach(
      square => {
        const ms = this.game.moves({ square, verbose: true });
        if (ms.length) {
          dests[square] = ms.map(m => m.to);
        }
      }
    );
    return dests;
  }

  possibleMovesStr(): string {
    return JSON.stringify(this.possibleMoves());
  }

  opponentMoves() {
    let moves = [];
    let turn = this.game.turn();
    const originalPGN = this.game.pgn();
    console.log(originalPGN);
    const squares = [];
    const pieces = [];
    this.game.SQUARES.forEach(
      square => {
        // chess.get('a5') -> { type: 'p', color: 'b' },
        const piece = this.game.get(square);
        if (piece) {
          squares.push(square);
          pieces.push(piece);
        }
      }
    );

    this.game.clear();
    for (let index = 0; index < squares.length; index++) {
      const square = squares[index];
      const piece = pieces[index];
      this.game.put(piece, square);
    }

    let tokens = this.game.fen().split(' ');
    tokens[1] = turn === 'w' ? 'b' : 'w';
    tokens = tokens.join(' ');
    console.log(tokens);
    if (this.game.load(tokens)) {
      moves = this.game.moves({ verbose: true });
      console.log(moves);
    }

    this.game.load_pgn(originalPGN);
    return moves;
  }


  opponentMovesStr(): string {
    return JSON.stringify(this.opponentMoves());
  }

  private moveIsCheck(move): boolean {
    return move.san.includes('+') ? true : false;
  }

  private moveIsCapture(move): boolean {
    return move.san.includes('x') ? true : false;
  }


  isPromotion(orig: cgTypes.Key, dest: cgTypes.Key): boolean {
    const filteredPromotions = this.promotions.filter(move => move.from === orig && move.to === dest);
    return filteredPromotions.length > 0; // The current movement is a promotion
  }

  calculatePromotions() {
    const moves = this.game.moves({ verbose: true });
    this.promotions = [];
    moves.forEach(move => {
      if (move.promotion) {
        this.promotions.push(move);
      }
    });
  }

  countThreats(color: cgTypes.Color) {
    const threats = {};
    let captures = 0;
    let checks = 0;
    let moves = this.game.moves({ verbose: true });
    if (color !== this.toColor()) {
      moves = this.opponentMoves();
    }
    if (moves.length === 0) {
      return null; // It´s an invalid position
    }
    moves.forEach(move => {
      if (this.moveIsCapture(move)) {
        captures++;
      }
      if (this.moveIsCheck(move)) {
        checks++;
      }
    });
    // promotions count as 4 moves. This remove those duplicates moves.
    // threats[`legal_${color}`] = uniques(moves.map(move => move.from + move.to)).length;
    threats[`checks_${color}`] = checks;
    threats[`threat_${color}`] = captures;
    threats[`turn`] = color;
    return threats;
  }


  paintOpponentThreats() {
    const opponentMoves = this.opponentMoves();
    const threats = [];
    opponentMoves.forEach(
      (move: any) => {
        // threats.push({ orig: move.to, brush: 'yellow' });
        if (this.moveIsCapture(move)) {
          threats.push({ orig: move.from, dest: move.to, brush: 'red' });
        }
        if (this.moveIsCheck(move)) {
          return;
          //threats.push({ orig: move.from, dest: move.to, brush: 'blue' });
        }
      }
    );
    this.board.setShapes(threats);
  }

  paintThreats() {
    const moves = this.game.moves({ verbose: true });
    console.log(moves);
    const threats = [];
    moves.forEach(
      (move: any) => {
        // threats.push({ orig: move.to, brush: 'yellow' });
        if (this.moveIsCapture(move)) {
          threats.push({ orig: move.from, dest: move.to, brush: 'red' });
        }
        if (this.moveIsCheck(move)) {
          threats.push({ orig: move.from, dest: move.to, brush: 'blue' });
        }
      }
    );
    this.board.setShapes(threats);
  }

  afterMove() {
    if (this.showThreats) {
      this.paintThreats();
      //this.paintOpponentThreats();
    }
    /*
    const threats = this.countThreats(this.toColor()) || {};
    threats['history'] = this.game.history();
    threats['fen'] = this.game.fen();
    //this.$emit('onMove', threats);
    console.log(threats);
    */
  }

  onPromotion() {
    return 'q';
  }

  onBoardAfterMove() {
    return (orig: cgTypes.Key, dest: cgTypes.Key, capturedPiece?: cgTypes.Piece) => {
      console.log(orig + ' ' + dest + ' ' + capturedPiece);
      let promoteTo = '';
      if (this.isPromotion(orig, dest)) {
        promoteTo = this.onPromotion();
      }
      const move = this.game.move({ from: orig, to: dest, promotion: promoteTo });

      this.board.set(
        {
          fen: this.game.fen(),
          turnColor: this.toColor(),
          movable: {
            color: this.toColor(),
            dests: this.possibleMoves(),
          }
        });
      this.calculatePromotions();
      this.afterMove();
    };
  }


}
