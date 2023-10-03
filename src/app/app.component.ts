import { Component, TemplateRef, ViewChild, OnInit } from '@angular/core';
import { ColDef, GridOptions } from 'ag-grid-community';
import {
  CellTemplateComponent,
  CellTemplateContext,
  CellTemplateDirective,
} from './cell-template.directive';

interface Car {
  make: string;
  model: string;
  price: number;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  genericTypes!: { tData: Car; tValue: number; tContext: { test: boolean } };

  @ViewChild(CellTemplateDirective, { read: TemplateRef })
  cellTemplateRef: TemplateRef<CellTemplateContext<any>> | undefined;

  columnDefs: ColDef[] | undefined = [
    {
      field: 'price',
      flex: 1,
      cellRenderer: CellTemplateComponent,
      cellRendererParams: { ngTemplate: () => this.cellTemplateRef },
    },
    { field: 'make' },
    { field: 'model' },
  ];

  rowData = [
    { make: 'Toyota', model: 'Celica', price: 35000 },
    { make: 'Ford', model: 'Mondeo', price: 32000 },
    { make: 'Porsche', model: 'Boxster', price: 72000 },
  ];
  gridOptions: GridOptions = {
    context: {test: true}
  };

  appCounter = 0;

  ngOnInit() {
    console.log('ngOnInit', this.cellTemplateRef);
    setInterval(() => {
      this.appCounter++;
    }, 1000);
  }
}
