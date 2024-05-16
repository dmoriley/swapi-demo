import { NgModule } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatRippleModule } from '@angular/material/core';
import { MatDividerModule } from '@angular/material/divider';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatButtonModule } from '@angular/material/button';

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
import { EntityDetailsPageComponent } from './pages/entity-details-page/entity-details-page.component';
import { HomePageComponent } from './pages/home/home.component';
import { PageNotFoundComponent } from './pages/page-not-found/page-not-found.component';
import { FilmsPageComponent } from './pages/films/films.component';
import { PlanetsPageComponent } from './pages/planets/planets.component';
import { StarshipsPageComponent } from './pages/starships-page/starships-page.component';
import { VehiclesPageComponent } from './pages/vehicles-page/vehicles-page.component';
import { SpeciesPageComponent } from './pages/species-page/species-page.component';
import { DataTableComponent } from './lib/components';
import { LazyLoadDropdownComponent } from './lib/components/lazy-load-dropdown/lazy-load-dropdown.component';

@NgModule({
  declarations: [
    AppComponent,
    PeoplePageComponent,
    EntityDetailsPageComponent,
    PageNotFoundComponent,
    HomePageComponent,
    FilmsPageComponent,
    PlanetsPageComponent,
    StarshipsPageComponent,
    VehiclesPageComponent,
    SpeciesPageComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatToolbarModule,
    MatIconModule,
    MatDividerModule,
    MatSidenavModule,
    MatButtonModule,
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
    DataTableComponent,
    LazyLoadDropdownComponent,
  ],
  providers: [
    { provide: WINDOW, useFactory: windowFactory },
    { provide: DOCUMENT, useFactory: documentFactory },
    { provide: HTTP_INTERCEPTORS, useClass: LoadingInterceptor, multi: true },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
