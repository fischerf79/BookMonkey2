import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Book } from '../shared/book';
import { ActivatedRoute, Router, ParamMap } from '@angular/router';
import { BookStoreService } from '../shared/book-store.service';

@Component({
  selector: 'bm-book-details',
  templateUrl: './book-details.component.html',
  styles: []
})
export class BookDetailsComponent implements OnInit {

  book: Book;
  @Output() showListEvent: EventEmitter<Book> = new EventEmitter();

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private bookStoreService: BookStoreService
  ) { }

  ngOnInit() {
    this.route.paramMap.subscribe((value: ParamMap) => {
      this.book = this.bookStoreService.getBook(value.get('id'));
    });
  }

  getRating(num: Number): Array<Number> {
    return new Array<Number>(num);
  }

  showList() {
    this.showListEvent.emit();
  }
}
