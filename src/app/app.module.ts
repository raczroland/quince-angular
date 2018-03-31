import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import {TableModule} from 'primeng/table';
import {DialogModule} from 'primeng/dialog';
import {ButtonModule} from 'primeng/button';

import { AppComponent } from './app.component';
import { DataService } from './services/data.service';
import { StoreModule } from '@ngrx/store';
import { personsReducer } from './store/persons.reducer';
import { EffectsModule } from '@ngrx/effects';
import { PersonsEffects } from './store/persons.effects';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    TableModule,
    HttpClientModule,
    DialogModule,
    BrowserAnimationsModule,
    StoreModule.forRoot({persons: personsReducer}),
    EffectsModule.forRoot([PersonsEffects]),
    ButtonModule,
    ReactiveFormsModule,
  ],
  providers: [
    DataService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
