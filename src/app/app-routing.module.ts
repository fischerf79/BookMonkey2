import { BookCreateComponent } from './book-create/book-create.component';
import { Routes, RouterModule } from '@angular/router';
import { BookListComponent } from './book-list/book-list.component';
import { BookDetailsComponent } from './book-details/book-details.component';
import { NgModule, Component } from '@angular/core';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: '/home' },
  { path: 'books', component: BookListComponent},
  { path: 'books/:isbn', component: BookDetailsComponent },
  { path: 'home', component: HomeComponent },
  { path: 'newBook', component: BookCreateComponent },
  { path: 'newBook/:isbn', component: BookCreateComponent }
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: []
})
export class AppRoutingModule {}
