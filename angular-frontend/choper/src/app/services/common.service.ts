import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class CommonService {

    endPoint: string;
    http: HttpClient;
    httpOptions = {
        headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };

    constructor() {
    }

    private log(message: string) {
        // this.messageService.add(`HeroService : ${message}`);
    }

    private handleError<T>(operation = 'operation', result?: T) {
        return (error: any): Observable<T> => {

            // TODO: send the error to remote logging infrastructure
            console.error(error); // log to console instead

            // TODO: better job of transforming error for user consumption
            this.log(`${operation} failed: ${error.message}`);

            // Let the app keep running by returning an empty result.
            return of(result as T);
        };
    }

    getItems<T>(): Observable<T[]> {
        return this.http.get<T[]>(this.endPoint)
            .pipe(
                tap(_ => this.log('getting items...')),
                catchError(this.handleError<T[]>('getItems', []))
            );
    }

    getItem<T>(id: string): Observable<T> {
        return this.http.get<T>(this.endPoint + id)
            .pipe(
                tap(_ => this.log(`getting item ${id}`)),
                catchError(this.handleError<T>('getItem id=${id}'))
            );
    }

    addItem<T>(data: any): Observable<T> {
        return this.http.post<T>(this.endPoint, data, this.httpOptions)
            .pipe(
                tap(_ => this.log(`adding item ${data}`)),
                catchError(this.handleError<T>('addItem'))
            );
    }

    updateItem<T>(id: string, data: any): Observable<T> {
        return this.http.put<T>(this.endPoint + id, data, this.httpOptions)
            .pipe(
                tap(_ => this.log(`updating item ${id}`)),
                catchError(this.handleError<T>('updateItem'))
            );
    }

    deleteItem<T>(id: string): Observable<T> {
        return this.http.delete<T>(this.endPoint + id, this.httpOptions)
            .pipe(
                tap(_ => this.log(`deleting item ${id}`)),
                catchError(this.handleError<T>('deleteItem'))
            );
    }


}
