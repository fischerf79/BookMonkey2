import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'isbn'
})
export class IsbnPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    if (!value) {
      return null;
    }
    if (value.length !== 10 && value.length !== 13) {
      return null;
    }


    const isbnValue: string = value;
    let prefix = '';
    let result = '';

    if (args) {
      if (isbnValue.length === 10) {
        prefix = 'ISBN10: ';
      } else {
        prefix = 'ISBN13: ';
      }
    }

    if (isbnValue.length === 13) {
      result = `${prefix}${isbnValue.substring(0, 3)}-${isbnValue.substring(3)}`;
    } else {
      result = prefix + isbnValue;
    }

    return result;
  }

}
