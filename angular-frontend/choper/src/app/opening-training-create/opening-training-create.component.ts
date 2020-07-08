import { Component, OnInit } from '@angular/core';
import { CommonService } from '../services/common.service';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { ChessOpeningTraining } from '../models/chess-opening-training.model';
import { Location } from '@angular/common';
// import { Api } from 'chessground/api';
import { ChessOpeningTrainingBaseComponent } from '../opening-training-base/opening-training-base.component';

@Component({
  selector: 'app-opening-training-create',
  templateUrl: './opening-training-create.component.html',
  styleUrls: ['./opening-training-create.component.css']
})
export class ChessOpeningTrainingCreateComponent extends ChessOpeningTrainingBaseComponent implements OnInit {
  // item = new ChessOpeningTraining();
  // private board: Api;

  /*
  constructor(
    private service: CommonService,
    private route: ActivatedRoute,
    private location: Location) {
    this.service.endPoint = 'http://localhost:3108/choper/api/trainings/';
  }
  */
  ngOnInit(): void {
    super.ngOnInit();
    /*
    this.route.paramMap.subscribe(
      (params: ParamMap) => {
        console.log('ChessOpeningTrainingCreateComponent.route : ' + JSON.stringify(this.route));
        console.log('ChessOpeningTrainingCreateComponent.ngOnInit.params : ' + JSON.stringify(params));
        const duplicatedId = params.get('id');
        console.log('ChessOpeningTrainingCreateComponent.ngOnInit.duplicatedId : ' + duplicatedId);
        if (duplicatedId !== null) {
          this.service.getItem<ChessOpeningTraining>(duplicatedId)
            .subscribe(
              (data: ChessOpeningTraining) => {
                this.item = data;
                this.item.id = null; // in order to not replace the duplicated item
                console.log('OpeningTrainingCreateComponent.ngOnInit : data = ' + JSON.stringify(data));
                console.log('OpeningTrainingCreateComponent.ngOnInit : OK for id = ' + duplicatedId);
              },
              (error: any) => {
                console.log('ChessOpeningTrainingComponent.loadItem : KO for id = ' + duplicatedId);
                console.log('Error : ' + error.toString());
              }
            );
        }
      }
    );
    */
  }

  submit() {
    this.saveItem();
  }

  goBack(): void {
    this.location.back();
  }

  saveItem() {
    this.service.addItem<ChessOpeningTraining>(this.item)
      .subscribe(
        (data: ChessOpeningTraining) => {
          this.item = data;
          console.log('ChessOpeningTrainingComponent.saveItem OK : data = ' + data);
          // console.log('ChessOpeningTrainingComponent.saveItem : OK for id = ' + this.item.id); this.goBack();
        },
        (error: any) => {
          console.log('ChessOpeningTrainingComponent.saveItem : KO for item = ' + this.item);
          console.log('Error : ' + error.toString());
        }
      );
  }

}
