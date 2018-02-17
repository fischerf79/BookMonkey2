import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Book } from './book';
import { Thumbnail } from './thumbnail';
import { Subject } from 'rxjs/Subject';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map, catchError, retry } from 'rxjs/operators';
import { of } from 'rxjs/observable/of';

@Injectable()
export class BookStoreService {

  private api = 'https://book-monkey2-api.angular-buch.com';
  private httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(private http: HttpClient) {
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
      .get<Book[]>(`${this.api}/books?isbn=${isbn}`, this.httpOptions).pipe(
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
   * Gibt für einen Suchbegriff die gefundenen Bücher zurück.
   * @param searchTerm Suchbegriff als QueryParameter
   */
  searchBook(searchTerm: string): Observable<Array<Book>> {
    return this.http
      .get<Array<Book>>(`${this.api}/books/search/${searchTerm}`, this.httpOptions)
      .pipe(
        retry(3),
        catchError(this.handleError<Array<Book>>(`search books by searchTerm=${searchTerm}`))
      );
  }

  create(book: Book): Observable<Book> {
    return this.http
      .post<Book>(`${this.api}/book`, JSON.stringify(book), this.httpOptions)
      .pipe(
        catchError(this.handleError<Book>(`create new book`))
      );
  }

  update(book: Book): Observable<Book> {
    return this.http
      .put<Book>(`${this.api}/book`, JSON.stringify(book), this.httpOptions)
      .pipe(
        catchError(this.handleError<Book>(`update book with id=${book.id}`))
      );
  }

  remove(book: Book): Observable<Book> {
    return this.http
      .delete<Book>(`${this.api}/book/${book.id}`, this.httpOptions)
      .pipe(
        catchError(this.handleError<Book>(`delete book with id=${book.id}`))
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
