import { Component, OnInit } from '@angular/core';
import { ChessOpeningTree } from '../models/chess-opening-tree.model';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Location } from '@angular/common';
import { ChessOpeningTreeService } from '../services/chessOpeningTree.service';

@Component({
  selector: 'app-opening-tree',
  templateUrl: './opening-tree.component.html',
  styleUrls: ['./opening-tree.component.css']
})
export class ChessOpeningTreeComponent implements OnInit {
  item: ChessOpeningTree;
  itemId: string;

  constructor(
    private treeService: ChessOpeningTreeService,
    private route: ActivatedRoute,
    private location: Location) {
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(
      (params: ParamMap) => {
        this.itemId = params.get('id');
        console.log('ChessOpeningTreeComponent.ngOnInit : data = ' + this.item);
        console.log('ChessOpeningTreeComponent.ngOnInit : id = ' + this.itemId);
        this.loadItem();
      }
    );
  }

  loadItem() {
    this.treeService.getItem<ChessOpeningTree>(this.itemId)
      .subscribe(
        (data: ChessOpeningTree) => {
          this.item = data;
          console.log('ChessOpeningTreeComponent.loadItem : data = ' + data);
          console.log('ChessOpeningTreeComponent.loadItem : OK pour id = ' + this.itemId);
        },
        (error: any) => {
          console.log('ChessOpeningTreeComponent.loadItem : KO pour id = ' + this.itemId);
          console.log('erreur : ' + error.toString());
        }
      );
  }

}
