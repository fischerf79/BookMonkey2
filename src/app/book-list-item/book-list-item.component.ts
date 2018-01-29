import { Book } from './../shared/book';
import { Component, OnInit, Input, Output } from '@angular/core';
import { EventEmitter } from '@angular/core/src/event_emitter';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'a.bm-book-list-item',
  templateUrl: './book-list-item.component.html',
  styles: []
})
export class BookListItemComponent implements OnInit {
  @Input() book: Book;


  constructor() { }

  ngOnInit() {
  }
}
