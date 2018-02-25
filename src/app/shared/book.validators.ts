import { FormControl, FormArray, ValidatorFn, ValidationErrors, AsyncValidatorFn } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import { BookStoreService } from './book-store.service';
import { map } from 'rxjs/operators';

export class BookValidators {
  static isbnFormat(fc: FormControl): { [error: string]: any } | null {
    if (!fc || !fc.value) {
      return null;
    }
    const isolatedNumbers = fc.value.replace(new RegExp('-', 'g'), '');
    const isbnPattern: RegExp = new RegExp(/(^\d{10}$)|(^\d{13}$)/);
    const result: boolean = isbnPattern.test(isolatedNumbers);
    if (result) {
      return null;
    } else {
      return { 'isbnFormat': { valid: false }};
    }
  }

  static atLeastOneAuthor(controlArray: FormArray): ValidationErrors | null {
    if (!controlArray) {
      return null;
    }
    // search for empty author
    if (controlArray.controls.some((fc: FormControl, index: number, array: FormControl[]) => {
      if (fc.value) {
        return true;
      }
      return false;
    })) {
      return { 'atLeastOneAuthor': { valid: false }};
    }
    return null;
  }

  static isbnExistsAsync(bookStoreService: BookStoreService): AsyncValidatorFn {
    return (fc: FormControl): Promise<ValidationErrors | null> | Observable<ValidationErrors | null> => {
      const isbn: string = fc.value;
      if (!isbn) {
        return Observable.create(() => null);
      }
      return bookStoreService.check(isbn).pipe(
        map(exists => {
          if (exists) {
            return { 'isbnExists': { valid: false }};
          } else {
            return null;
          }
        })
      );
    };
  }
}
