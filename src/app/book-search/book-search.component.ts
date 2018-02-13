import { Subscription } from 'rxjs/Subscription';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { BookStoreService } from './../shared/book-store.service';
import { Component, OnInit, Output, EventEmitter, OnDestroy } from '@angular/core';
import { Book } from '../shared/book';
import {debounceTime, distinctUntilChanged, switchMap, tap } from 'rxjs/operators';

@Component({
  selector: 'bm-book-search',
  templateUrl: './book-search.component.html',
  styles: []
})
export class BookSearchComponent implements OnInit, OnDestroy {

  private subscriptions = new Array<Subscription>();

  isLoading = false;

  @Output() bookSelected = new EventEmitter<Book>();

  searchTerm = new Subject<string>();
  foundBooks = new Array<Book>();

  constructor(private bookStoreService: BookStoreService) { }

  ngOnInit() {
      this.subscriptions.push(this.searchTerm
        .pipe(
          // wait 300ms after each keystroke before considering the term
          debounceTime(300),

          // ignore new term if same as previous term
          distinctUntilChanged(),

          tap(() => this.isLoading = true),

          // switch to new search observable each time the term changes
          switchMap((searchValue: string, index: number) => {
            return this.bookStoreService.searchBook(searchValue);
          }),

          tap(() => this.isLoading = false)
        ).subscribe((books: Book[]) => {
          this.foundBooks = books;
        }));
  }

  ngOnDestroy(): void {
    if (this.subscriptions) {
      this.subscriptions.forEach((value: Subscription, index: number, array: Subscription[]) => {
        value.unsubscribe();
      });
    }
  }

  /**
   * Fügt einen Suchbegriff einem Observable hinzu
   * @param term Suchbegriff
   */
  search(term: string): void {
    if (term) {
      // Push a search term into the observable stream.
      this.searchTerm.next(term);
    }
  }
}
