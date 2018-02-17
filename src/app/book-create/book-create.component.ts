import { BookFormErrorMessages } from './../shared/book-form-error-messages';
import { BookStoreService } from './../shared/book-store.service';
import { Thumbnail } from './../shared/thumbnail';
import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { Book } from '../shared/book';
import { NgForm } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import { BookFactory } from '../shared/book-factory';

@Component({
  selector: 'bm-book-create',
  templateUrl: './book-create.component.html',
  styles: []
})
export class BookCreateComponent implements OnInit {

  newBook: Book = BookFactory.empty();
  errors: { [key: string]: string } = {};

  @ViewChild('newBookForm') newBookForm: NgForm;

  constructor(private bookStoreService: BookStoreService) { }

  ngOnInit() {
    this.newBookForm.statusChanges.subscribe(() => {
      this.updateErrorMessage();
    });
  }

  save(): void {
    if (!this.newBookForm) {
      return;
    }
    console.log(this.newBookForm);

    this.newBook.authors = this.newBookForm.value.authors.split(',');
    this.newBook.thumbnails = [this.newBookForm.value.thumbnail];
    const bookToCreate = BookFactory.fromObject(this.newBook);

    this.bookStoreService.create(bookToCreate).subscribe(() => {
      console.log(`Buch erfolgreich gespeichert...`);
      this.newBook = BookFactory.empty();
      this.newBookForm.reset(BookFactory.empty());
    });
  }

  private updateErrorMessage(): any {
    this.errors = {};
    for (const message of BookFormErrorMessages) {
      const control = this.newBookForm.form.get(message.forControl);
      if (control &&
        control.dirty &&
        control.invalid &&
        control.errors[message.forValidation] &&
        !this.errors[message.forControl]) {
          this.errors[message.forControl] = message.text;
        }
    }
  }

}
