import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonItemService, CommonListService } from './common.service';


/*
    ChessOpeningTrainingListService
    service for operations on a list of opening training :
        GET opening training list
        POST a new opening training
*/
@Injectable({
    providedIn: 'root'
})
export class ChessOpeningTrainingListService extends CommonListService {

    constructor(public http: HttpClient) {
        super(http);
        this.endPoint = 'http://localhost:3108/choper/api/trainings';
    }

}

/*
    ChessOpeningTrainingService
    service for operations on a single opening training :
        GET an opening training
        UPDATE an opening training
        DELETE an opening training
*/
@Injectable({
    providedIn: 'root'
})
export class ChessOpeningTrainingService extends CommonItemService {

    constructor(public http: HttpClient) {
        super(http);
        this.endPoint = 'http://localhost:3108/choper/api/trainings/';
    }

}
