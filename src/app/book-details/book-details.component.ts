import { Component, OnInit } from '@angular/core';
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

  constructor(
    private route: ActivatedRoute,
    private bookStoreService: BookStoreService
  ) { }

  ngOnInit() {
    this.route.paramMap.subscribe((value: ParamMap) => {
      if (value.has('isbn')) {
        this.book = this.bookStoreService.getBook(value.get('isbn'));
      }
    });
  }

  getRating(num: Number): Array<Number> {
    return new Array<Number>(num);
  }
}
