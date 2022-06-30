import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EntityDetailsPageComponent } from '@pages/entity-details-page/entity-details-page.component';
import { PageNotFoundComponent } from '@pages/page-not-found/page-not-found.component';
import { PreventDirectNavigationGuard } from './lib/guards';
import {
  FilmsPageComponent,
  HomePageComponent,
  PeoplePageComponent,
  PlanetsPageComponent,
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
  { path: '**', component: PageNotFoundComponent }, // Wildcard route for a 404 page
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
