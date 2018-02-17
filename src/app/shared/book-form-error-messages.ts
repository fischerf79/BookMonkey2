import { ErrorMessage } from './error-message';
export const BookFormErrorMessages = [
  new ErrorMessage('title', 'required', 'Ein Buchtitel muss angegeben werden'),
  new ErrorMessage('isbn', 'required', 'Es muss eine ISBN angegeben werden'),
  new ErrorMessage('isbn', 'minlength', 'Die ISBN muss mindestens 10 Ziffern enthalten'),
  new ErrorMessage('isbn', 'maxlength', 'Eine ISBN darf nicht mehr als 13 Ziffern enthalten'),
  new ErrorMessage('published', 'required', 'Es muss ein Erscheinungsdatum angegeben werden'),
  new ErrorMessage('authors', 'required', 'Es muss ein Autor angegeben werden')
];
