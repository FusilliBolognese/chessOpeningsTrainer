import { Component, OnInit } from '@angular/core';
import { ChessOpeningTraining } from '../models/chess-opening-training.model';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { Chessground } from 'chessground';
import * as chessgroundConfig from 'chessground/config';
import * as chessgroundTypes from 'chessground/types';
import * as chessgroundUtil from 'chessground/util';
import * as chessgroundApi from 'chessground/api';
import { ChessOpeningTrainingService } from '../services/chessOpeningTraining.service';

@Component({
  selector: 'app-opening-training-base',
  template: `
    <p>
      opening-training-base works!
    </p>
  `,
  styleUrls: ['./opening-training-base.component.css']
})
export class ChessOpeningTrainingBaseComponent implements OnInit {

  item: ChessOpeningTraining;
  board: chessgroundApi.Api;

  constructor(
    public trainingService: ChessOpeningTrainingService,
    public route: ActivatedRoute,
    public location: Location) {
    this.item = new ChessOpeningTraining();
  }

  ngOnInit(): void {
    this.board = Chessground(document.getElementById('ground'), {});
  }

  getBoardConfig(): chessgroundConfig.Config {
    return {
      coordinates: true,
      fen: this.fen(),
      turnColor: this.turnColor(),
      movable: {
        free: false,
        color: this.movableColor(),
        dests: this.possibleMoves(),
      },
      events: {
        move: this.onBoardAfterMove(),
      },
      draggable: {
        showGhost: false,
      },
      selectable: {
        enabled: false,
      }
    };
  }


  fen(): string {
    return this.item.fen;
  }

  pgn(): string {
    return this.item.pgn_text;
  }

  turnColor(): 'white' | 'black' {
    return (this.item.turn === 'w') ? 'white' : 'black';
  }

  movableColor(): 'white' | 'black' | 'both' {
    return (this.item.turn === 'w') ? 'white' : 'black';
  }

  moveIsCheck(move): boolean {
    return move.san.includes('+') ? true : false;
  }

  moveIsCapture(move): boolean {
    return move.san.includes('x') ? true : false;
  }

  isPromotion(orig: string, dest: string): boolean {
    // const filteredPromotions = this.promotions.filter(move => move.from === orig && move.to === dest);
    // return filteredPromotions.length > 0; // The current movement is a promotion
    return false;
  }

  move(san: string) {
    // this.trainingService.updateItem()
    return true;
  }

  /*
   export interface Dests {
     [key: string]: Key[] | undefined;
   }
   type Key = 'a1', ... 'h8'
   returns possibleMoves moves. {"a2":["a3" "a4"], "b1":["a3" "c3"]}
 */
  possibleMoves(): chessgroundTypes.Dests {
    const dests = {};
    chessgroundUtil.allKeys.forEach(
      (keySquare: chessgroundTypes.Key) => {
        const destsForSquare = this.item.legal_moves.map(
          (move: string) => {
            const fromSquare: chessgroundTypes.Key = move.substr(0, 2) as chessgroundTypes.Key;
            if (fromSquare === keySquare) {
              const toSquare: chessgroundTypes.Key = move.substr(2, 2) as chessgroundTypes.Key;
              return toSquare;
            }
          }
        ).filter(dest => dest != null);
        if (destsForSquare.length) {
          dests[keySquare] = destsForSquare;
        }
      }
    );

    console.log('possible moves : ' + JSON.stringify(dests));
    return dests;
  }

  updateBoardConfig() {
    this.board.set(this.getBoardConfig());
  }

  onBoardAfterMove() {
    return (orig: chessgroundTypes.Key, dest: chessgroundTypes.Key, capturedPiece?: chessgroundTypes.Piece) => {
      if (this.item.uci_text) {
        this.item.uci_text = this.item.uci_text + ' ' + String(orig) + String(dest);
      } else {
        this.item.uci_text = String(orig) + String(dest);
      }
      console.log('ChessOpeningTrainingBaseComponent.onBoardAfterMove : this.item.uci_text = ' + this.item.uci_text);
      this.updateItem(this.item.id);
    };
  }

  loadItem(itemId: string) {
    this.trainingService.getItem<ChessOpeningTraining>(itemId)
      .subscribe(
        (data: ChessOpeningTraining) => {
          this.item = data;
          console.log('ChessOpeningTrainingEditComponent.loadItem : data = ' + JSON.stringify(data));
          console.log('ChessOpeningTrainingEditComponent.loadItem : OK for id = ' + itemId);
          this.updateBoardConfig();
        },
        (error: any) => {
          console.log('ChessOpeningTrainingEditComponent.loadItem : KO for id = ' + itemId);
          console.log('Error : ' + error.toString());
        }
      );
  }

  updateItem(itemId: string) {
    this.trainingService.updateItem<ChessOpeningTraining>(itemId, this.item)
      .subscribe(
        (data: ChessOpeningTraining) => {
          this.item = data;
          console.log('ChessOpeningTrainingEditComponent.updateItem : data = ' + JSON.stringify(data));
          console.log('ChessOpeningTrainingEditComponent.updateItem : OK for id = ' + itemId);
          this.updateBoardConfig();
        },
        (error: any) => {
          console.log('ChessOpeningTrainingEditComponent.updateItem : KO for id = ' + itemId);
          console.log('Error : ' + error.toString());
        }
      );
  }

  deleteItem(itemId: string) {
    this.trainingService.deleteItem<ChessOpeningTraining>(this.item.id)
      .subscribe(
        (data: ChessOpeningTraining) => {
          console.log('ChessOpeningTrainingEditComponent.deleteItem : OK for id = ' + itemId);
        },
        (error: any) => {
          console.log('ChessOpeningTrainingEditComponent.deleteItem : KO for id = ' + itemId);
          console.log('Error : ' + error.toString());
        }
      );
  }
}
