import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { AgGridModule } from 'ag-grid-angular';
import { CellTemplateComponent, CellTemplateDirective } from './cell-template.directive';

@NgModule({
  declarations: [
    AppComponent,
    CellTemplateDirective,
    CellTemplateComponent
  ],
  imports: [
    BrowserModule,
    AgGridModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
