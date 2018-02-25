import { InMemoryBookStoreService } from './shared/in-memory-book-store.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule, LOCALE_ID } from '@angular/core';
import { AppComponent } from './app.component';
import { BookListComponent } from './book-list/book-list.component';
import { BookListItemComponent } from './book-list-item/book-list-item.component';
import { BookDetailsComponent } from './book-details/book-details.component';
import { BookStoreService } from './shared/book-store.service';
import { AppRoutingModule } from './app-routing.module';
import { HomeComponent } from './home/home.component';
import { HttpClientModule } from '@angular/common/http';
import { BookSearchComponent } from './book-search/book-search.component';
import { BookCreateComponent } from './book-create/book-create.component';
import { DateValueAccessorModule } from 'angular-date-value-accessor';
import { ReactiveFormsModule } from '@angular/forms';
import { registerLocaleData } from '@angular/common';
import localeDE from '@angular/common/locales/de';
registerLocaleData(localeDE);

@NgModule({
  declarations: [
    AppComponent,
    BookListComponent,
    BookListItemComponent,
    BookDetailsComponent,
    HomeComponent,
    BookSearchComponent,
    BookCreateComponent
  ],
  imports: [
    HttpClientModule,
    ReactiveFormsModule,
    BrowserModule,
    AppRoutingModule,
    DateValueAccessorModule
  ],
  providers: [
    { provide: LOCALE_ID, useValue: 'de' },
    BookStoreService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
