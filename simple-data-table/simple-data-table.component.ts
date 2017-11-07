import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-simple-data-table',
  templateUrl: './simple-data-table.component.html'
})
export class SimpleDataTableComponent implements OnInit {

  @Input()
  public data: any[] = [];
  public dataFields: string[] = [];
  @Input()
  public idField: string = '';

  @Input()
  public tableClasses: string[] = [];

  @Input()
  public dataFieldNames: object = {};

  // Type depends on type of data's idField.
  @Output()
  public rowClicked = new EventEmitter<any>();

  constructor() { }

  public onClick(id: any) {
    this.rowClicked.emit(id);
  }

  ngOnInit() {
    this.fillDataFields();
  }

  private fillDataFields() {

    if (!this.data || (this.data.length < 1)) {
      return;
    }
    for (const field in this.data[0]) {
      this.dataFields.push(field);
      // Als we geen custom kolomnamen hebben, 
      // gebruik dan de data object properties als veldnamen.
      if (!this.dataFieldNames[field]) {
        this.dataFieldNames[field] = field;
      }
    }
    // Als 'idField' niet gegeven is gebruik dan het eerste veld
    // als idField. IdField wordt doorgegeven aan rowClicked output
    // als er op een rij geklikt wordt.
    if (this.idField == '') {
      this.idField = this.dataFields[0];
    }
  }

}
