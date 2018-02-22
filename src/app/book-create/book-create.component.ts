import { BookFormErrorMessages } from './../shared/book-form-error-messages';
import { BookStoreService } from './../shared/book-store.service';
import { Thumbnail } from './../shared/thumbnail';
import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { Book } from '../shared/book';
import { NgForm, FormBuilder, FormGroup, FormArray, FormControl, Validators } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import { BookFactory } from '../shared/book-factory';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { BookValidators } from '../shared/book.validators';

@Component({
  selector: 'bm-book-create',
  templateUrl: './book-create.component.html',
  styles: []
})
export class BookCreateComponent implements OnInit {

  isUpdatingBook = false;
  bookForm: FormGroup;
  authors: FormArray;
  thumbnails: FormArray;

  book: Book = BookFactory.empty();
  errors: { [key: string]: string } = {};

  constructor(
    private formBuilder: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private bookStoreService: BookStoreService) { }

  ngOnInit() {
    this.initBook();

    this.activatedRoute.paramMap.subscribe((paramMap: ParamMap) => {
      if (paramMap && paramMap.has('isbn')) {
        this.isUpdatingBook = true;
        const isbn = paramMap.get('isbn');
        // abrufen des Buchs
        console.log(`Rufe Buch mit ISBN ${isbn} ab.`);
        this.bookStoreService.getBook(isbn).subscribe((bookResult: Book) => {
          if (bookResult) {
            this.book = bookResult;
          } else {
            this.book = BookFactory.empty();
          }
          this.initBook();
        });
      }
    });
  }

  save(): void {
    // filtern leerer Authoren
    this.bookForm.value.authors =
      this.bookForm.value.authors.filter(author => author);

    // sowie leerer Bilder
    this.bookForm.value.thumbnails =
      this.bookForm.value.thumbnails.filter(thumbnail => thumbnail.url);

    const currentBook: Book = BookFactory.fromObject(this.bookForm.value);

    if (this.isUpdatingBook) {
      // update
      this.bookStoreService.update(currentBook).subscribe(() => {
        console.log('Buch wurde erfolgreich aktualisiert');
      });
    } else {
      // create
      this.bookStoreService.create(currentBook).subscribe(() => {
        console.log('Buch wurde erforlgreich gespeichert');
        this.bookForm.reset(BookFactory.empty());
      });
    }

  }

  addAuthorControl(): void {
    const newAuthorControl = this.formBuilder.control('');
    this.authors.push(newAuthorControl);
  }

  addThumbnailControl(): void {
    const newThumbnailControlGroup = this.formBuilder.group({
      url: '',
      title: ''
    });
    this.thumbnails.push(newThumbnailControlGroup);
  }

  /**
   * Erzeugt und initialisiert das Form Model
  */
 private initBook(): void {
  this.buildAuthorsArray();
  this.buildThumbnailsArray();

  this.bookForm = this.formBuilder.group({
    title: [this.book.title, Validators.required],
    subtitle: this.book.subtitle,
    isbn: [this.book.isbn, [
        Validators.required,
        BookValidators.isbnFormat
      ]
    ],
    published: this.book.published,
    description: this.book.description,
    authors: this.authors,
    thumbnails: this.thumbnails
  });

  this.bookForm.statusChanges.subscribe(() => {
    this.updateErrorMessage();
  });
}

  private updateErrorMessage(): any {
    this.errors = {};
    for (const message of BookFormErrorMessages) {
      const control = this.bookForm.get(message.forControl);
      if (control &&
        control.dirty &&
        control.invalid &&
        control.errors[message.forValidation] &&
        !this.errors[message.forControl]) {
          this.errors[message.forControl] = message.text;
        }
    }
  }

  private buildAuthorsArray(): void {
    const authorsFormControls = this.book.authors.map((value: string) => {
      return this.formBuilder.control(value);
    });
    this.authors = this.formBuilder.array(authorsFormControls,
      Validators.compose([Validators.required, BookValidators.atLeastOneAuthor]));
  }

  private buildThumbnailsArray(): void {
    const thumbnailFormGroups = this.book.thumbnails.map((value: Thumbnail) => {
      return this.formBuilder.group({
        url: value.url,
        title: value.title
      });
    });
    this.thumbnails = this.formBuilder.array(thumbnailFormGroups);
  }
}
