import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { NgxSpinnerModule } from 'ngx-spinner';
import { MatTabsModule } from '@angular/material/tabs';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import {AutocompleteLibModule} from 'angular-ng-autocomplete';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatAutocompleteModule} from '@angular/material/autocomplete';


import { WeatherService } from "./services/weather.service";
import { Utility } from "./utility";

import { AppComponent } from './app.component';
import { WeatherComponent } from './weather/weather.component';


import {RouterModule} from '@angular/router';
import {allAppRoutes} from './routes';

@NgModule({
  declarations: [
    AppComponent,
    WeatherComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(allAppRoutes),
    ReactiveFormsModule,
    HttpClientModule,
    MatTabsModule,
    BrowserAnimationsModule,
    NgxSpinnerModule,
    MatFormFieldModule,
    MatInputModule,
    MatAutocompleteModule,
    AutocompleteLibModule
  ],
  providers: [WeatherService, Utility],
  bootstrap: [AppComponent]
})
export class AppModule { }
