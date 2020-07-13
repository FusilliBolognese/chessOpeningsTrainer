import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonItemService, CommonListService } from './common.service';


/*
    ChessOpeningTreeListService
    service for operations on a list of opening tree :
        GET opening tree list
        POST a new opening tree
*/
@Injectable({
    providedIn: 'root'
})
export class ChessOpeningTreeListService extends CommonListService {

    constructor(public http: HttpClient) {
        super(http);
        this.endPoint = 'http://localhost:3108/choper/api/openings';
    }

}

/*
    ChessOpeningTreeService
    service for operations on an opening tree :
        GET an opening tree
        UPDATE an opening tree
        DELETE an opening tree
*/
@Injectable({
    providedIn: 'root'
})
export class ChessOpeningTreeService extends CommonItemService {

    constructor(public http: HttpClient) {
        super(http);
        this.endPoint = 'http://localhost:3108/choper/api/openings/';
    }

}
