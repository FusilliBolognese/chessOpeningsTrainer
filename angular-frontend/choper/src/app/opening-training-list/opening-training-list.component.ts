import { Component, OnInit } from '@angular/core';
import { ChessOpeningTraining } from '../models/chess-opening-training.model';
import { CommonService } from '../services/common.service';

@Component({
  selector: 'app-opening-training-list',
  templateUrl: './opening-training-list.component.html',
  styleUrls: ['./opening-training-list.component.css']
})
export class ChessOpeningTrainingListComponent implements OnInit {
  items: ChessOpeningTraining[];

  constructor(private service: CommonService) {
    this.service.endPoint = 'http://localhost:3108/choper/api/trainings';
  }

  ngOnInit(): void {
    this.loadItems();
  }

  loadItems() {
    this.service.getItems<ChessOpeningTraining>()
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

}
