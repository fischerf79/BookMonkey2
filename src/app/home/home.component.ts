import { Component, OnInit } from '@angular/core';
import { Book } from '../shared/book';
import { Router } from '@angular/router';

@Component({
  selector: 'bm-home',
  templateUrl: './home.component.html',
  styles: []
})
export class HomeComponent implements OnInit {

  constructor(private routerService: Router) { }

  ngOnInit() {
  }

  onBookSelected(selectedBook: Book): void {
    if (selectedBook) {
      this.navigateToSelectedBook(selectedBook);
    }
  }

  private navigateToSelectedBook(selectedBook: Book) {
    this.routerService.navigate(['/books', selectedBook.isbn]);
  }
}
