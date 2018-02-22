import { FormControl, FormArray } from '@angular/forms';

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

  static atLeastOneAuthor(controlArray: FormArray): { [error: string]: any } | null {
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

  static isbnExists(fc: FormControl): { [error: string]: any } | null {
    return null;
  }
}
