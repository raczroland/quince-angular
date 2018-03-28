import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import {TableModule} from 'primeng/table';
import {DialogModule} from 'primeng/dialog';

import { AppComponent } from './app.component';
import { DataService } from './services/data.service';


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
  ],
  providers: [
    DataService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
