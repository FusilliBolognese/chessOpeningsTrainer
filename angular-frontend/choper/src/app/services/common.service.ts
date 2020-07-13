import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';


@Injectable({
    providedIn: 'root'
})
export  class CommonService {

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

    getItems<T>(): Observable<T[]> {
        return this.http.get<T[]>(this.endPoint)
            .pipe(
                tap(_ => this.log('CommonService.getItems : getting items...')),
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
