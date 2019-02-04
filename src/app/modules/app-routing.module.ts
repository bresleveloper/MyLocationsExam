import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CategoriesComponent } from '../comps/categories/categories.component';
import { LocationsComponent } from '../comps/locations/locations.component';
import { locationEditFormComponent } from '../comps/location-edit-form/location-edit-form.component';
import { LocationViewPropsComponent } from '../comps/location-view-props/location-view-props.component';
import { MapViewComponent } from '../comps/map-view/map-view.component';
import { LocationsGroupedComponent } from '../comps/locations-grouped/locations-grouped.component';

const routes: Routes = [
  { path: 'categories', component: CategoriesComponent },
  { path: 'locations', component: LocationsComponent },
  { path: 'locations/:catid', component: LocationsComponent },
  { path: 'locationEditForm', component: locationEditFormComponent },
  { path: 'locationEditForm/:id', component: locationEditFormComponent },
  { path: 'locationView/:id', component: LocationViewPropsComponent },
  { path: 'mapView/:id', component: MapViewComponent },
  { path: 'mapView', component: MapViewComponent },
  { path: 'locationsGrouped', component: LocationsGroupedComponent },

  { path: '',   redirectTo: '/categories', pathMatch: 'full' },
  { path: '**', redirectTo: '/categories', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
