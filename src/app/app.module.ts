import { NgModule } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatRippleModule } from '@angular/material/core';
import { MatDividerModule } from '@angular/material/divider';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

import { MatSidenavModule } from '@angular/material/sidenav';
import { MatTableModule } from '@angular/material/table';

import { MatToolbarModule } from '@angular/material/toolbar';

import { BrowserModule } from '@angular/platform-browser';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { MatPaginatorModule } from '@angular/material/paginator';
import { PeoplePageComponent } from '@pages/people';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {
  DOCUMENT,
  documentFactory,
  LoadingInterceptor,
  WINDOW,
  windowFactory,
} from './lib';
import { DataTableComponent } from './lib/components/data-table/data-table.component';
import { EntityDetailsPageComponent } from './pages/entity-details-page/entity-details-page.component';
import { HomePageComponent } from './pages/home/home.component';
import { PageNotFoundComponent } from './pages/page-not-found/page-not-found.component';
import { LazyLoadDropdownComponent } from './lib/components/lazy-load-dropdown/lazy-load-dropdown.component';

@NgModule({
  declarations: [
    AppComponent,
    PeoplePageComponent,
    DataTableComponent,
    EntityDetailsPageComponent,
    PageNotFoundComponent,
    HomePageComponent,
    LazyLoadDropdownComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatToolbarModule,
    MatIconModule,
    MatDividerModule,
    MatSidenavModule,
    MatListModule,
    MatTableModule,
    MatPaginatorModule,
    MatInputModule,
    MatRippleModule,
    MatCardModule,
    MatExpansionModule,
    MatProgressSpinnerModule,
    MatProgressBarModule,
    FormsModule,
    BrowserAnimationsModule,
    HttpClientModule,
  ],
  providers: [
    { provide: WINDOW, useFactory: windowFactory },
    { provide: DOCUMENT, useFactory: documentFactory },
    { provide: HTTP_INTERCEPTORS, useClass: LoadingInterceptor, multi: true },
  ],
  bootstrap: [AppComponent],
  exports: [DataTableComponent],
})
export class AppModule {}
