import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SimpleDataTableComponent } from './simple-data-table.component';
import { By } from "@angular/platform-browser";
import { DebugElement } from "@angular/core";


describe('SimpleDataTableComponent', () => {
  let component: SimpleDataTableComponent;
  let fixture: ComponentFixture<SimpleDataTableComponent>;
  let tableElement: DebugElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SimpleDataTableComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SimpleDataTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    tableElement = fixture.debugElement.query(By.css('table'));
  });

  it('should be created', () => {
    component.data = [];
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });


  it('should behave when input is null', () => {
    component.data = null;
    component.ngOnInit();
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });


  it('should create a table with given data', () => {
    component.data = [
      { name: 'Dan Pearson', dept: 'external', room: 'H2 05' },
      { name: 'Chris Young', dept: 'FSE', room: 'H2 05' },
      { name: 'Kate Driscoll', dept: 'FSE', room: 'H2 05' },
      { name: 'Peter Smith', dept: 'FSE', room: 'F2 06' }
    ];
    component.ngOnInit();
    fixture.detectChanges();
    expect(tableElement.nativeElement.textContent).toContain('dept');
    expect(tableElement.nativeElement.textContent).toContain('Jeroen');
  });


  it('should create a table with default class(es)', () => {
    component.tableClasses = ['blah'];
    component.ngOnInit();
    fixture.detectChanges();
    expect(tableElement.nativeElement.classList).toContain('blah');
  });

  it('should create a table with the custom column headers', () => {
    component.data = [
      { name: 'Chris Young', dept: 'FSE', room: 'H2 05' },
      { name: 'Kate Driscoll', dept: 'FSE', room: 'H2 05' },
    ];
    component.dataFieldNames = {
      name: 'Naam',
      dept: 'Afdeling',
      room: 'Kamer'
    };
    component.ngOnInit();
    fixture.detectChanges();
    expect(tableElement.nativeElement.textContent).toContain('Afdeling');
    expect(tableElement.nativeElement.textContent).toContain('Kaie');

  });

  it('should emit an rowClicked event with id "Chris Young" when first row is clicked', () => {
    component.data = [
      { name: 'Chris Young', dept: 'FSE', room: 'H2 05' },
      { name: 'Kate Driscoll', dept: 'FSE', room: 'H2 05' },
    ];
    let id = null;
    component.ngOnInit();
    fixture.detectChanges();
    fixture.componentInstance.rowClicked.subscribe((i) => { id = i; }
    );
    // Simulate click on first row
    tableElement.query(By.css('td')).parent.triggerEventHandler('click', null);
    fixture.detectChanges();
    expect(id).toBe('Chris Young');
  });

  it('should emit an rowClicked event with id "H2 05" when first row is clicked', () => {
    component.data = [
      { name: 'Chris Young', dept: 'FSE', room: 'H2 05' },
      { name: 'Kate Driscoll', dept: 'FSE', room: 'H2 06' },
    ];
    component.idField = 'room';
    let id = null;
    component.ngOnInit();
    fixture.detectChanges();
    fixture.componentInstance.rowClicked.subscribe((i) => { id = i; }
    );
    // Simulate click on first row
    tableElement.query(By.css('td')).parent.triggerEventHandler('click', null);
    fixture.detectChanges();
    expect(id).toBe('H2 05');
  });

});
