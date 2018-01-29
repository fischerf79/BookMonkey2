import { Book } from './../../../BookMonkey2/src/app/shared/book';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'bm-book-details',
  templateUrl: './book-details.component.html',
  styles: []
})
export class BookDetailsComponent implements OnInit {

  @Input() book: Book;
  @Output() showListEvent: EventEmitter<Book> = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

  getRating(num: Number): Array<Number> {
    return new Array<Number>(num);
  }

  showList() {
    this.showListEvent.emit();
  }
}
