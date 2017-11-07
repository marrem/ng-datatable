import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SimpleDataTableComponent } from './simple-data-table/simple-data-table.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [SimpleDataTableComponent],
  exports: [SimpleDataTableComponent]
})
export class DataTableModule { }
