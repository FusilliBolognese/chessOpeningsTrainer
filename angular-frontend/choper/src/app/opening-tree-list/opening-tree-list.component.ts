import { Component, OnInit } from '@angular/core';
import { ChessOpeningTree } from '../models/chess-opening-tree.model';
import { ChessOpeningTreeService } from '../services/chessOpeningTree.service';
import { CommonService } from '../services/common.service';

@Component({
  selector: 'app-opening-tree-list',
  templateUrl: './opening-tree-list.component.html',
  styleUrls: ['./opening-tree-list.component.css']
})
export class ChessOpeningTreeListComponent implements OnInit {
  items: ChessOpeningTree[];

  constructor(private service: CommonService) {
    this.service.endPoint = 'http://localhost:3108/choper/api/openings';
  }

  ngOnInit(): void {
    this.loadItems();
  }

  loadItems() {
    this.service.getItems<ChessOpeningTree>()
      .subscribe(
        (data: ChessOpeningTree[]) => {
          this.items = data;
          console.log(data);
          console.log('loadOpeningTrees OK');
        },
        (error: any) => {
          console.log('loadOpeningTrees KO : ' + error.toString());
        }
      );
  }

}
