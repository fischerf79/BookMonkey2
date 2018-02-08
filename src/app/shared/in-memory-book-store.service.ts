import { Thumbnail } from './thumbnail';
import { Injectable } from '@angular/core';
import { InMemoryDbService, RequestInfo } from 'angular-in-memory-web-api';
import { Book } from './book';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class InMemoryBookStoreService implements InMemoryDbService {

  constructor() { }

  createDb(reqInfo?: RequestInfo): {} | Observable<{}> | Promise<{}> {
    const books: Book[] = [
      {
        id: 1,
        isbn: '1234567890',
        title: 'Erster Titel - Test1',
        authors: [
          'Testautor1',
          'Testautor2',
          'Testautor3'],
        published: new Date(2018, 0, 1),
        subtitle: 'Testsubtitel',
        rating: 3,
        thumbnails: [
          { url: '../../assets/images/TestBild1.jpg', title: 'TestUrlTitel1' }
        ],
        description: 'TestBeschreibung'
      },
      {
        id: 2,
        isbn: '2222222222',
        title: 'Erster Titel - Test2',
        authors: [
          'Testautor1',
          'Testautor2',
          'Testautor3'],
        published: new Date(2018, 0, 2),
        subtitle: 'Testsubtitel2',
        rating: 3,
        thumbnails: [
          { url: '../../assets/images/TestBild2.jpg', title: 'TestUrlTitel12' }
        ],
        description: 'TestBeschreibung2'
      },
      {
        id: 3,
        isbn: '333333333',
        title: 'Erster Titel - Test3',
        authors: [
          'Testautor1',
          'Testautor2',
          'Testautor3'],
        published: new Date(2018, 0, 3),
        subtitle: 'Testsubtitel3',
        rating: 3,
        thumbnails: [
          { url: '../../assets/images/TestBild3.png', title: 'TestUrlTitel13' }
        ],
        description: 'TestBeschreibung3'
      }
    ];

    if (reqInfo) {
      // tslint:disable-next-line:no-console
      console.info(reqInfo);
    }
    return { books };
  }
}
