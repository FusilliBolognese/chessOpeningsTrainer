import { CollectionViewer, DataSource } from "@angular/cdk/collections";
import { Observable, BehaviorSubject, of } from 'rxjs';
import { catchError, finalize } from 'rxjs/operators';
import { ChessOpeningTraining } from '../models/chess-opening-training.model';
import { ChessOpeningTrainingListService } from '../services/chessOpeningTraining.service';

export class ChessOpeningTrainingListDataSource implements DataSource<ChessOpeningTraining> {

  private chessOpeningTrainingSubject = new BehaviorSubject<ChessOpeningTraining[]>([]);
  private loadingSubject = new BehaviorSubject<boolean>(false);

  public loading$ = this.loadingSubject.asObservable();
  public count = 0;

  constructor(private trainingListService: ChessOpeningTrainingListService) { }


  connect(collectionViewer: CollectionViewer): Observable<ChessOpeningTraining[]> {
    const ret = this.chessOpeningTrainingSubject.asObservable();
    return ret;
  }

  disconnect(collectionViewer: CollectionViewer): void {
    this.chessOpeningTrainingSubject.complete();
    this.loadingSubject.complete();
  }

  loadTrainings(params = {}) {
    this.loadingSubject.next(true);

    this.trainingListService.getItems(params)
      .pipe(
        catchError(() => of([])),
        finalize(() => {
          this.loadingSubject.next(false);
          console.log('ChessOpeningTrainingListDataSource.loadItems finalize')
        })
      )
      .subscribe((trainings: ChessOpeningTraining[]) => {
        this.count = trainings.length;
        this.chessOpeningTrainingSubject.next(trainings)
        console.log('ChessOpeningTrainingListDataSource.loadItems subscribe : ');
        console.log(trainings);
      });
  }
}
