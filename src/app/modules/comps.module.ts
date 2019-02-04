import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AppRoutingModule } from '../modules/app-routing.module';

import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import { MatModule } from '../modules/mat.module';



import { HeaderButtonsComponent,  } from '../comps/header-buttons/header-buttons.component';
import { FooterComponent } from '../comps/footer/footer.component';

import { BaseListComponent } from '../comps/base-list/base-list.component';
import { CategoriesComponent } from '../comps/categories/categories.component';
import { LocationsComponent } from '../comps/locations/locations.component';
import { locationEditFormComponent } from '../comps/location-edit-form/location-edit-form.component';
import { LocationViewPropsComponent } from '../comps/location-view-props/location-view-props.component';
import { MapViewComponent } from '../comps/map-view/map-view.component';
import { LocationsGroupedComponent } from '../comps/locations-grouped/locations-grouped.component';


@NgModule({
  declarations: [
    HeaderButtonsComponent, 
    FooterComponent,
    BaseListComponent,
    CategoriesComponent,
    LocationsComponent,
    locationEditFormComponent,
    LocationViewPropsComponent,
    MapViewComponent,
    LocationsGroupedComponent,


  ],
  imports: [
    CommonModule,
    AppRoutingModule,


    BrowserAnimationsModule,
    FormsModule, 
    ReactiveFormsModule,
    MatModule
  ],

  exports:[    
    HeaderButtonsComponent, 
    FooterComponent,
    BaseListComponent,
    CategoriesComponent,
    LocationsComponent,
    locationEditFormComponent,
    LocationViewPropsComponent,
    MapViewComponent,
    LocationsGroupedComponent,

  
  ]
})
export class CompsModule { }
