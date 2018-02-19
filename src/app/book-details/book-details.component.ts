import { Subscription } from 'rxjs/Subscription';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Book } from '../shared/book';
import { ActivatedRoute, Router, ParamMap } from '@angular/router';
import { BookStoreService } from '../shared/book-store.service';

@Component({
  selector: 'bm-book-details',
  templateUrl: './book-details.component.html',
  styles: []
})
export class BookDetailsComponent implements OnInit, OnDestroy {

  private subscriptions: Array<Subscription> = new Array<Subscription>();
  book: Book;

  constructor(
    private route: ActivatedRoute,
    private bookStoreService: BookStoreService
  ) { }

  ngOnInit() {
    const paramMapSubs: Subscription = this.route.paramMap.subscribe((value: ParamMap) => {
      if (value.has('isbn')) {
        const isbn = value.get('isbn');
        const subscript: Subscription = this.bookStoreService.getBook(isbn)
        .subscribe((bookValue: Book) => {
          this.book = bookValue;
        });
        this.subscriptions.push(subscript);
      }
    });
    this.subscriptions.push(paramMapSubs);
  }

  ngOnDestroy() {
    // unsubscriben der Observer
    if (this.subscriptions) {
      this.subscriptions.forEach(sub => sub.unsubscribe());
    }
  }

  getRating(num: Number): Array<Number> {
    return new Array<Number>(num);
  }

  removeBook(): void {
    if (this.book && confirm(`Wollen Sie das Buch ${this.book.title} löschen?`)) {
      this.bookStoreService.remove(this.book).subscribe(() => {
      });
    }
  }
}
