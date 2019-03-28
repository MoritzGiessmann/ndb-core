import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SchoolDetailComponent } from './school-detail.component';
import {
  MatCheckboxModule,
  MatFormFieldModule,
  MatIconModule,
  MatSortModule,
  MatTableModule,
  MatSnackBar, MatInputModule,
} from '@angular/material';
import {MatExpansionModule} from '@angular/material/expansion';
import {SchoolsService} from '../schools.service';
import {ActivatedRoute} from '@angular/router';
import {FormBuilder, ReactiveFormsModule} from '@angular/forms';
import {EntityMapperService} from '../../entity/entity-mapper.service';
import {AlertService} from '../../alerts/alert.service';
import {ConfirmationDialogService} from '../../ui-helper/confirmation-dialog/confirmation-dialog.service';
import {Database} from '../../database/database';
import { Location } from '@angular/common';
import {Observable} from 'rxjs';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import * as uniqid from 'uniqid'; //  Necessary for usage of uniqid in the component
import {MockDatabaseManagerService} from '../../database/mock-database-manager.service';
import {RouterTestingModule} from '@angular/router/testing';

describe('SchoolDetailComponent', () => {
  let component: SchoolDetailComponent;
  let fixture: ComponentFixture<SchoolDetailComponent>;
  const mockedRoute = {snapshot: { params: { id: 'new' } } };
  const mockedLocation = {back: () => null};
  const mockedSnackBar = {open: () => { return {
    onAction: () => Observable.create(observer => observer.next())
  }}};
  const mockedConfirmationDialog = { openDialog: () => { return {
      afterClosed: () => Observable.create(observer => observer(false))
  }}};

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SchoolDetailComponent ],
      imports: [
        MatTableModule,
        MatFormFieldModule,
        MatSortModule,
        MatExpansionModule,
        MatIconModule,
        MatCheckboxModule,
        ReactiveFormsModule,
        BrowserAnimationsModule,
        MatInputModule,
        RouterTestingModule.withRoutes([])
      ],
      providers: [
        EntityMapperService,
        SchoolsService,
        AlertService,
        FormBuilder,
        { provide: ConfirmationDialogService, useValue: mockedConfirmationDialog},
        { provide: MatSnackBar, useValue: mockedSnackBar},
        { provide: Location, useValue: mockedLocation},
        { provide: ActivatedRoute, useValue: mockedRoute},
        { provide: Database, useValue: new MockDatabaseManagerService().getDatabase()},
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SchoolDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
