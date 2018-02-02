import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Book } from './book';
import { Thumbnail } from './thumbnail';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class BookStoreService {

  private booksValue: Array<Book> = [new Book(
      '9871234567',
      'Angular die Referenz',
      ['Jodhannes Hoppe', 'Kai Wiesinger', 'Else Sonstnochwer'],
      new Date(2017, 3, 1),
      'von den Grundlagen über praktische Beispiele zum Expertenwissen',
      5,
      [new Thumbnail('https://ng-buch.de/cover2.jpg', 'Buchcover')],
      'Mit Angular wird ihre Anwendung gut...'
    ),
    new Book(
      '978543210',
      'Angular for Dummies',
      ['Kyle Richmond', 'Alan Potter', 'Serena Wiliams'],
      new Date(2016, 1, 1),
      'Easy introduction in angular framework for everybody',
      3,
      [new Thumbnail('https://ng-buch.de/cover1.jpg', 'Buchcover')],
      'This book gives an overview of the google angular framework v5 for hobby programmers...'
  )];

  private books: BehaviorSubject<Array<Book>> = new BehaviorSubject<Array<Book>>(this.booksValue);

  constructor() { }

  getAllBooks(): Observable<Array<Book>> {
    return this.books;
  }

  getBook(isbn: string): Book {
    const filteredBooks: Book[] = this.booksValue.filter(x => x.isbn === isbn);
    return filteredBooks[0];
  }
}
