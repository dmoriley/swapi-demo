import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EntityDetailsPageComponent } from '@pages/entity-details-page/entity-details-page.component';
import { PageNotFoundComponent } from '@pages/page-not-found/page-not-found.component';
import { SpeciesPageComponent } from '@pages/species-page/species-page.component';
import { VehiclesPageComponent } from '@pages/vehicles-page/vehicles-page.component';
import { PreventDirectNavigationGuard } from './lib/guards';
import {
  FilmsPageComponent,
  HomePageComponent,
  PeoplePageComponent,
  PlanetsPageComponent,
  StarshipsPageComponent,
} from './pages';

const routes: Routes = [
  {
    path: '',
    title: 'Swapi Demo',
    component: HomePageComponent,
  },
  {
    path: 'people',
    title: 'People',
    component: PeoplePageComponent,
  },
  {
    path: 'films',
    title: 'Films',
    component: FilmsPageComponent,
  },
  {
    path: 'planets',
    title: 'Planets',
    component: PlanetsPageComponent,
  },
  {
    path: 'starships',
    title: 'Starships',
    component: StarshipsPageComponent,
  },
  {
    path: 'vehicles',
    title: 'Vehicles',
    component: VehiclesPageComponent,
  },
  {
    path: 'species',
    title: 'Species',
    component: SpeciesPageComponent,
  },
  {
    path: 'people/details/:id',
    title: 'People Details',
    canActivate: [PreventDirectNavigationGuard],
    component: EntityDetailsPageComponent,
  },
  {
    path: 'films/details/:id',
    title: 'Films Details',
    canActivate: [PreventDirectNavigationGuard],
    component: EntityDetailsPageComponent,
  },
  {
    path: 'planets/details/:id',
    title: 'Planet Details',
    canActivate: [PreventDirectNavigationGuard],
    component: EntityDetailsPageComponent,
  },
  {
    path: 'starships/details/:id',
    title: 'Starship Details',
    canActivate: [PreventDirectNavigationGuard],
    component: EntityDetailsPageComponent,
  },
  {
    path: 'vehicles/details/:id',
    title: 'Vehicles Details',
    canActivate: [PreventDirectNavigationGuard],
    component: EntityDetailsPageComponent,
  },
  {
    path: 'species/details/:id',
    title: 'Species Details',
    canActivate: [PreventDirectNavigationGuard],
    component: EntityDetailsPageComponent,
  },
  { path: '**', component: PageNotFoundComponent }, // Wildcard route for a 404 page
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
