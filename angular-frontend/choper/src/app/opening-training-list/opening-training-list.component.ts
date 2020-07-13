import { Component, OnInit } from '@angular/core';
import { ChessOpeningTraining } from '../models/chess-opening-training.model';
import { ChessOpeningTrainingListService, ChessOpeningTrainingService } from '../services/chessOpeningTraining.service';

@Component({
  selector: 'app-opening-training-list',
  templateUrl: './opening-training-list.component.html',
  styleUrls: ['./opening-training-list.component.css']
})
export class ChessOpeningTrainingListComponent implements OnInit {
  items: ChessOpeningTraining[];

  constructor(
    private trainingListService: ChessOpeningTrainingListService,
    private trainingService: ChessOpeningTrainingService) {
  }

  ngOnInit(): void {
    this.loadItems();
  }

  loadItems() {
    this.trainingListService.getItems<ChessOpeningTraining>()
      .subscribe(
        (data: ChessOpeningTraining[]) => {
          this.items = data;
          console.log(data);
          console.log('ChessOpeningTrainingListComponent.loadItems OK : ' + JSON.stringify(data));
        },
        (error: any) => {
          console.log('ChessOpeningTrainingListComponent.loadItems KO : ' + error.toString());
        }
      );
  }

  deleteItem(item: ChessOpeningTraining) {
    this.trainingService.deleteItem<ChessOpeningTraining>(item.id)
      .subscribe(
        (data: ChessOpeningTraining) => {
          console.log('ChessOpeningTrainingListComponent.deleteItem OK : ' + item.id);
          const deletedIndex = this.items.indexOf(item);
          if (deletedIndex >= 0) {
            this.items.splice(deletedIndex, 1);
          }
        },
        (error: any) => {
          console.log('ChessOpeningTrainingListComponent.deleteItem KO : ' + error.toString());
        }
      );
  }
}

