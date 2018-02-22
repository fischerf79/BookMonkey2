import { ErrorMessage } from './error-message';
export const BookFormErrorMessages = [
  new ErrorMessage('title', 'required', 'Ein Buchtitel muss angegeben werden'),
  new ErrorMessage('isbn', 'required', 'Es muss eine ISBN angegeben werden'),
  new ErrorMessage('isbn', 'isbnFormat', 'Die ISBN muss aus 10 oder 13 Ziffern bestehen'),
  new ErrorMessage('published', 'required', 'Es muss ein Erscheinungsdatum angegeben werden'),
  new ErrorMessage('authors', 'required', 'Es muss ein Autor angegeben werden'),
  new ErrorMessage('authors', 'atLeastOneAuthor', 'Es müssen alle Autoren angegeben werden')
];
