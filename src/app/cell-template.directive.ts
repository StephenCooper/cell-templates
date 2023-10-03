import { Component, Directive, Input, TemplateRef } from '@angular/core';
import { ICellRendererAngularComp } from 'ag-grid-angular';
import { ColDef, ICellRendererParams, IRowNode } from 'ag-grid-community';


@Component({
  selector: 'cell-template-renderer',
  template: `

  <ng-container *ngIf="!cellTemplateRef">
      <span>Missing ngTemplate from cellRendererParams for CellTemplateComponent</span>
    </ng-container>

    <ng-container
      *ngIf="cellTemplateRef"
      [ngTemplateOutlet]="cellTemplateRef"
      [ngTemplateOutletContext]="templateContext"
    >
    </ng-container>
  `
})
export class CellTemplateComponent implements ICellRendererAngularComp {

  cellTemplateRef: TemplateRef<CellTemplateContext<any>> | undefined;
  templateContext: CellTemplateContext | undefined;

refresh(params: ICellRendererParams): boolean {
  this.templateContext = {
    $implicit: params,
    rowNode: params.node
  };
  return true;
}

  agInit(params: ICellRendererParams & {ngTemplate: any}): void {
    this.cellTemplateRef = params.ngTemplate();
    this.refresh(params);
  }
}

export interface CellTemplateContext<TData = any, TValue = any, TContext = any> {
  // $implicit value for let-option support
  $implicit: ICellRendererParams<TData, TValue, TContext>;
  // Required to support *selected syntax as that does not use $implicit
  rowNode: IRowNode<TData>;
}

@Directive({
  selector: 'ng-template[cell-template]',
})
export class CellTemplateDirective<TData, TValue, TContext> {

  @Input()
  genericTypes!: {tData: TData, tValue: TValue, tContext: TContext};

  static ngTemplateContextGuard<T, U, S>(
    dir: CellTemplateDirective<T, U, S>,
    ctx: unknown
  ): ctx is CellTemplateContext<T, U, S> {
    return true;
  }
}
