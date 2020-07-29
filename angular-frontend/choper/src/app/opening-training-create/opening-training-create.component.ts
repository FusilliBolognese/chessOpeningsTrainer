import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { ChessOpeningTraining } from '../models/chess-opening-training.model';
import { Location } from '@angular/common';
import { ChessOpeningTree } from '../models/chess-opening-tree.model';
import { ChessOpeningTreeService, ChessOpeningTreeListService } from '../services/chessOpeningTree.service';
import { ChessOpeningTrainingService, ChessOpeningTrainingListService } from '../services/chessOpeningTraining.service';


@Component({
  selector: 'app-opening-training-create',
  templateUrl: './opening-training-create.component.html',
  styleUrls: ['./opening-training-create.component.css']
})
export class ChessOpeningTrainingCreateComponent implements OnInit {
  item = new ChessOpeningTraining();
  allOpeningTrees: ChessOpeningTree[];
  selectedTree: ChessOpeningTree = null;

  constructor(
    //private trainingService: ChessOpeningTrainingService,
    private trainingListService: ChessOpeningTrainingListService,
    //private treeService: ChessOpeningTreeService,
    private treeListService: ChessOpeningTreeListService,
    private router: Router,
    private route: ActivatedRoute,
    //private location: Location,
  ) {
  }

  ngOnInit(): void {
    this.loadOpeningTreeList();
  }

  loadOpeningTreeList() {
    this.treeListService.getItems<ChessOpeningTree>()
      .subscribe(
        (data: ChessOpeningTree[]) => {
          this.allOpeningTrees = data;
          console.log(JSON.stringify(this.allOpeningTrees));
          this.route.paramMap
            .subscribe(
              (params: ParamMap) => {
                const openingTreeId = params.get('id');
                console.log('ChessOpeningTrainingCreateComponent.ngOnInit.openingTreeId : ' + openingTreeId);
                // if an open tree id is provided in the url path then we can automaticly create an instance of 
                // a training object with the opening tree id specified
                if (openingTreeId !== null) {
                  this.item.opening_tree_id = openingTreeId;
                  this.selectedTree = this.allOpeningTrees.find(element => String(element.id) === openingTreeId);
                  console.log('selected tree : ' + JSON.stringify(this.selectedTree));
                }
              }
            );
        },
        (error: any) => {
          console.log('loadOpeningTrees KO : ' + error.toString());
        }
      );
  }

  onSelectionChange(openingTree: ChessOpeningTree) {
    console.log('ChessOpeningTrainingCreateComponent.onSelectionChange : ' + JSON.stringify(openingTree));
    this.selectedTree = openingTree;
  }

  submit() {
    if (this.selectedTree) {
      this.item.opening_tree_id = this.selectedTree.id;
      this.saveItem(this.goToTraining);
    }
  }

  cancel() {
    this.router.navigate(['trainings']);
  }

  goToTraining = () => {
    this.router.navigate(['trainings', this.item.id]);
  }

  saveItem(callback) {
    console.log('ChessOpeningTrainingComponent.saveItem item = ' + JSON.stringify(this.item));
    this.trainingListService.addItem<ChessOpeningTraining>(this.item)
      .subscribe(
        (data: ChessOpeningTraining) => {
          this.item = data;
          console.log('ChessOpeningTrainingComponent.saveItem OK : data = ' + JSON.stringify(this.item));
          callback();
          // this.updateBoardConfig();
          // this.goBack();
          // console.log('ChessOpeningTrainingComponent.saveItem : OK for id = ' + this.item.id); this.goBack();
        },
        (error: any) => {
          console.log('ChessOpeningTrainingComponent.saveItem : KO for item = ' + JSON.stringify(this.item));
          console.log('Error : ' + error.toString());
        }
      );
  }

}
