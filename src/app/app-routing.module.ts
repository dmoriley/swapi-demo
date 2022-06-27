import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PeoplePageComponent } from './pages';

const routes: Routes = [
  {
    path: 'people',
    component: PeoplePageComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
