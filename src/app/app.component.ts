import { Component } from '@angular/core';
import { Book } from './shared/book';

@Component({
  selector: 'bm-root',
  templateUrl: './app.component.html',
  styles: []
})
export class AppComponent {
  isListOn = true;
  isDetailsOn = false;

  book: Book;

  showDetails(book: Book) {
    this.book = book;
    this.isListOn = false;
    this.isDetailsOn = true;
  }

  showList() {
    this.book = null;
    this.isListOn = true;
    this.isDetailsOn = false;
  }
}
