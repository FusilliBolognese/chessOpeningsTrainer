import { CommonService } from './common.service';
import { HttpClient } from '@angular/common/http';
import { ChessOpeningTree } from '../models/chess-opening-tree.model';

export class ChessOpeningTreeService {
    constructor(private service: CommonService) {
        this.service.endPoint = 'http://127.0.0.1:3108/api/openings/';
    }

    getItems(): ChessOpeningTree[] {
        let items: ChessOpeningTree[];
        this.service.getItems<ChessOpeningTree>()
            .subscribe(
                (data: ChessOpeningTree[]) => {
                    items = data;
                    console.log('load opening trees OK');
                },
                (error: any) => {
                    console.log('load opening trees KO : ' + error.toString());
                }
            );
        return items;
    }
}


