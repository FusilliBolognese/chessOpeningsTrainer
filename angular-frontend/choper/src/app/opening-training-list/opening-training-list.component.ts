import { Component, OnInit, ViewChild } from '@angular/core';
import { ChessOpeningTraining } from '../models/chess-opening-training.model';
import { ChessOpeningTrainingListService, ChessOpeningTrainingService } from '../services/chessOpeningTraining.service';
import { ChessOpeningTrainingListDataSource } from './opening-training-list.datasource';
import { MatPaginator } from '@angular/material/paginator';
import { ActivatedRoute } from '@angular/router';
import { tap } from 'rxjs/operators';


@Component({
  selector: 'app-opening-training-list',
  templateUrl: './opening-training-list.component.html',
  styleUrls: ['./opening-training-list.component.css']
})
export class ChessOpeningTrainingListComponent implements OnInit {
  //items: ChessOpeningTraining[];
  displayedColumns: string[] = ['id', 'date', 'score', 'opening'];
  dataSource: ChessOpeningTrainingListDataSource;

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(
    private trainingListService: ChessOpeningTrainingListService,
    //private trainingService: ChessOpeningTrainingService,
    //private route: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    //this.loadItems();
    this.dataSource = new ChessOpeningTrainingListDataSource(this.trainingListService);
    this.dataSource.loadTrainings({
      //'filter': 'opening_tree_id=3,variant=chess',
      'sortAttributes': '-date_lastmodified',
      'pageNumber': 0,
      'pageSize': 5
    });
  }

  ngAfterViewInit() {
    /*
    this.paginator.page
      .pipe(
        tap(() => this.loadTrainingsPage())
      )
      .subscribe();*/
  }

  loadTrainingsPage() {
    /*
    this.dataSource.loadItems({
      'sortOrder': 'asc',
      'pageNumber': this.paginator.pageIndex,
      'pageSize': this.paginator.pageSize
    });*/
  }

  /*
    loadItems() {
      var params = {};
      this.trainingListService.getItems<ChessOpeningTraining>(params)
        .subscribe(
          (data: ChessOpeningTraining[]) => {
            this.items = data;
            console.log('ChessOpeningTrainingListComponent.loadItems OK : ');
            console.log(data);
          },
          (error: any) => {
            console.log('ChessOpeningTrainingListComponent.loadItems KO : ');
            console.log(error.toString());
          }
        );
    }
  */

  /*
  deleteItem(item: ChessOpeningTraining) {
    this.trainingService.deleteItem<ChessOpeningTraining>(item.id)
      .subscribe(
        (data: ChessOpeningTraining) => {
          console.log('ChessOpeningTrainingListComponent.deleteItem OK : ' + item.id);
          const deletedIndex = this.items.indexOf(item);
          if (deletedIndex >= 0) {
            this.items.splice(deletedIndex, 1);
          }
        },
        (error: any) => {
          console.log('ChessOpeningTrainingListComponent.deleteItem KO : ' + error.toString());
        }
      );
  }
  */

  onRowClicked(row) {
    console.log('Row clicked: ', row);
  }
}

