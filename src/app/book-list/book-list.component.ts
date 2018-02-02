import { Thumbnail } from './../shared/thumbnail';
import { Book } from './../shared/book';
import { Component, OnInit } from '@angular/core';
import { BookStoreService } from '../shared/book-store.service';
import { OnDestroy } from '@angular/core/src/metadata/lifecycle_hooks';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'bm-book-list',
  templateUrl: './book-list.component.html',
  styles: []
})
export class BookListComponent implements OnInit, OnDestroy {
  private subscriptions: Array<Subscription> = new Array<Subscription>();

  books: Array<Book>;

  constructor(private bookStoreService: BookStoreService) { }

  ngOnInit() {
    const getAllBooksSubscription: Subscription =
      this.bookStoreService.getAllBooks().subscribe((value: Array<Book>) => {
        if (value) {
          this.books = value;
        }
      });
      this.subscriptions.push(getAllBooksSubscription);
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((value: Subscription, index: number, array: Subscription[]) => {
      value.unsubscribe();
    });
    this.subscriptions = null;
  }
}
