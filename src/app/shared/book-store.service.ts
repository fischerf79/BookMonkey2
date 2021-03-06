import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Book } from './book';
import { Thumbnail } from './thumbnail';
import { Subject } from 'rxjs/Subject';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map, catchError, retry } from 'rxjs/operators';
import { of } from 'rxjs/observable/of';
import { BookFactory } from './book-factory';

@Injectable()
export class BookStoreService {

  private api = 'https://book-monkey2-api.angular-buch.com';
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    })
  };

  constructor(private http: HttpClient) {
  }

  getAllBooks(): Observable<Book[]> {
    const url = encodeURI(`${this.api}/books`);
    return this.http
      .get<Book[]>(url)
      .pipe(
        retry(3),
        catchError(this.handleError<Book[]>(`getBooks`))
      );
  }

  getBook(isbn: string): Observable<Book> {
    const url =  encodeURI(`${this.api}/book/${isbn}`);
    return this.http
      .get<Book>(url, this.httpOptions).pipe(
        retry(3),
        map((value: any) => {
          if (value) {
            return BookFactory.fromObject(value);
          }
          return null;
        }),
        catchError(this.handleError<Book>(`getBook by isbn=${isbn}`))
      );
  }

  /**
   * Gibt für einen Suchbegriff die gefundenen Bücher zurück.
   * @param searchTerm Suchbegriff als QueryParameter
   */
  searchBook(searchTerm: string): Observable<Array<Book>> {
    const url = encodeURI(`${this.api}/books/search/${searchTerm}`);
    return this.http
      .get<Array<Book>>(url, this.httpOptions)
      .pipe(
        retry(3),
        catchError(this.handleError<Array<Book>>(`search books by searchTerm=${searchTerm}`))
      );
  }

  create(book: Book): Observable<Book> {
    const url = encodeURI(`${this.api}/book`);
    return this.http
      .post<Book>(url, JSON.stringify(book), this.httpOptions)
      .pipe(
        catchError(this.handleError<Book>(`create new book`))
      );
  }

  update(book: Book): Observable<Book> {
    const url = encodeURI(`${this.api}/book/${book.isbn}`);
    return this.http
      .put<Book>(url, JSON.stringify(book), this.httpOptions)
      .pipe(
        catchError(this.handleError<Book>(`update book with id=${book.id}`))
      );
  }

  remove(book: Book): Observable<Book> {
    const url = encodeURI(`${this.api}/book/${book.isbn}`);
    return this.http
      .delete<Book>(url, this.httpOptions)
      .pipe(
        catchError(this.handleError<Book>(`delete book with id=${book.id}`))
      );
  }

  check(isbn: string): Observable<boolean> {
    const url = encodeURI(`${this.api}/book/${isbn}/check`);
    return this.http.
      get<boolean>(url, this.httpOptions)
      .pipe(
        catchError(this.handleError<boolean>(`check unique isbn=${isbn}`))
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
