import { Thumbnail } from './../shared/thumbnail';
import { Book } from './../shared/book';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'bm-book-list',
  templateUrl: './book-list.component.html',
  styles: []
})
export class BookListComponent implements OnInit {

  books: Array<Book>;

  constructor() { }

  ngOnInit() {
    this.books = [
      new Book(
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
      )
    ];
  }

}
