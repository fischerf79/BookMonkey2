import { FormControl } from '@angular/forms';

export class BookValidators {
  static isbnFormat(fc: FormControl): { [error: string]: any } {
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

  static atLeastOneAuthor() {}

  static isbnExists() {}
}
