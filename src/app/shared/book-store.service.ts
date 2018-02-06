import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Book } from './book';
import { Thumbnail } from './thumbnail';
import { Subject } from 'rxjs/Subject';
import { HttpClient } from '@angular/common/http';
import { map, catchError, retry } from 'rxjs/operators';
import { of } from 'rxjs/observable/of';

@Injectable()
export class BookStoreService {

  private api = 'api';
  private headers = new Headers();

  constructor(private http: HttpClient) {
    this.headers.append('Content-Type', 'application/json');
  }

  getAllBooks(): Observable<Book[]> {
    return this.http
      .get<Book[]>(`${this.api}/books`)
      .pipe(
        retry(3),
        catchError(this.handleError<Book[]>(`getBooks`))
      );
  }

  getBook(isbn: string): Observable<Book> {
    return this.http
      .get<Book[]>(`${this.api}/books/?isbn=${isbn}`).pipe(
        retry(3),
        map((filteredBooks: Book[], index: number) => {
          if (filteredBooks && filteredBooks.length > 0) {
            return filteredBooks[0];
          }
          return null;
        }),
        catchError(this.handleError<Book>(`getBook id=${isbn}`))
      );
  }

    /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      console.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}
