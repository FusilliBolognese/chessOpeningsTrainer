import { Component, OnInit } from '@angular/core';
import { ChessOpeningTree } from '../models/chess-opening-tree.model';
import { ChessOpeningTreeService, ChessOpeningTreeListService } from '../services/chessOpeningTree.service';

@Component({
  selector: 'app-opening-tree-list',
  templateUrl: './opening-tree-list.component.html',
  styleUrls: ['./opening-tree-list.component.css']
})
export class ChessOpeningTreeListComponent implements OnInit {
  items: ChessOpeningTree[];

  constructor(private treeListService: ChessOpeningTreeListService) {
  }

  ngOnInit(): void {
    this.loadItems();
  }

  loadItems() {
    this.treeListService.getItems<ChessOpeningTree>()
      .subscribe(
        (data: ChessOpeningTree[]) => {
          this.items = data;
          console.log('ChessOpeningTreeListService.loadItems OK : ');
          console.log(data);
        },
        (error: any) => {
          console.log('ChessOpeningTreeListService.loadItems KO : ');
          console.log(error.toString());
        }
      );
  }

}
