import { CommonService } from './common.service';
import { HttpClient } from '@angular/common/http';
import { ChessOpeningTraining } from '../models/chess-opening-training.model';

export class ChessOpeningTrainingService {
    constructor(private service: CommonService) {
        this.service.endPoint = 'http://127.0.0.1:3108/api/trainings/';
    }

    getItems(): ChessOpeningTraining[] {
        let items: ChessOpeningTraining[];
        this.service.getItems<ChessOpeningTraining>()
            .subscribe(
                (data: ChessOpeningTraining[]) => {
                    items = data;
                    console.log('load trainings OK');
                },
                (error: any) => {
                    console.log('load trainings KO : ' + error.toString());
                }
            );
        return items;
    }
}


