import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { CompsModule } from './modules/comps.module';
import { AppRoutingModule } from './modules/app-routing.module';
import { AppComponent } from './app.component';


@NgModule({
  declarations: [
    AppComponent,

  ],
  imports: [
    BrowserModule,


    CompsModule,
    AppRoutingModule

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }



//ng build --prod --output-path docs --base-href MyLocationsExam

//ng build --output-path docs --base-href ng6Tutorials

//https://bresleveloper.github.io/ng6Tutorials/docs
