import { Component, OnInit } from '@angular/core';
import { ChessOpeningTraining } from '../models/chess-opening-training.model';
import { ParamMap } from '@angular/router';
// import { CommonService } from '../services/common.service';
// import { Location } from '@angular/common';

import { ChessOpeningTrainingBaseComponent } from '../opening-training-base/opening-training-base.component';

/*
import * as cgTypes from 'chessground/types';
import * as cgUtil from 'chessground/util';
import { State } from 'chessground/state';
import * as cgConfig from 'chessground/config';
import { Chessground } from 'chessground/chessground';
import { Api } from 'chessground/api';
*/


@Component({
  selector: 'app-opening-training-edit',
  templateUrl: './opening-training-edit.component.html',
  styleUrls: ['./opening-training-edit.component.css']
})
export class ChessOpeningTrainingEditComponent extends ChessOpeningTrainingBaseComponent implements OnInit {
  // item: ChessOpeningTraining;
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
    this.route.paramMap.subscribe(
      (params: ParamMap) => {
        const itemId: string = params.get('id');
        this.loadItem(itemId);
      }
    );
  }






}
