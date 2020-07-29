import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class CommonService {

  endPoint: string;
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(public http: HttpClient) {
  }

  log(message: string) {
    console.log(message);
    // this.messageService.add(`HeroService : ${message}`);
  }

  handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}

export class CommonListService extends CommonService {

  /*
    params :
      filter :
        This is a search string that will help us filter the results.
        If we pass the empty string '' it means that no filtering is done on the server
      sortOrder : asc | desc
        our backend allows us to sort based on the seqNo column, and with this parameter,
        we can specify is the sort order is ascending (which is the default asc value), or descending by passing the value desc
      pageNumber:
        With the results filtered and sorted, we are going to specify which page of that full list of results we need.
        The default is to return the first page (with index 0)
      pageSize:
        this specifies the page size
  */
  getItems<T>(params = {}): Observable<T[]> {
    var allParams = new HttpParams(params);
    for (var key in params) {
      var value = String(params[key]);
      allParams = allParams.set(key, value);
    }
    return this.http.get<T[]>(this.endPoint, { params: allParams })
      .pipe(
        tap(_ => this.log(`CommonService.getItems : ${this.endPoint}?${allParams}`)),
        catchError(this.handleError<T[]>('getItems', []))
      );
  }

  addItem<T>(data: any): Observable<T> {
    return this.http.post<T>(this.endPoint, data, this.httpOptions)
      .pipe(
        tap(_ => this.log(`CommonService.addItem : adding item ${data}`)),
        catchError(this.handleError<T>('addItem'))
      );
  }

}

export class CommonItemService extends CommonService {

  getItem<T>(id: string): Observable<T> {
    return this.http.get<T>(this.endPoint + id)
      .pipe(
        tap(_ => this.log(`CommonService.getItem : getting item ${id}`)),
        catchError(this.handleError<T>('getItem id=${id}'))
      );
  }

  updateItem<T>(id: string, data: any): Observable<T> {
    return this.http.put<T>(this.endPoint + id, data, this.httpOptions)
      .pipe(
        tap(_ => this.log(`CommonService.updateItem : updating item ${id}`)),
        catchError(this.handleError<T>('updateItem'))
      );
  }

  deleteItem<T>(id: string): Observable<T> {
    return this.http.delete<T>(this.endPoint + id, this.httpOptions)
      .pipe(
        tap(_ => this.log(`CommonService.deleteItem : deleting item ${id}`)),
        catchError(this.handleError<T>('deleteItem'))
      );
  }
}
