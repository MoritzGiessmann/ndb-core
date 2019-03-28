import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EntitySubrecordComponent } from './entity-subrecord.component';
import {
  MatAutocompleteModule,
  MatDialogModule,
  MatFormFieldModule,
  MatIconModule,
  MatSelectModule,
  MatSnackBarModule,
  MatTableModule
} from '@angular/material';
import {EntityMapperService} from '../../entity/entity-mapper.service';
import {ConfirmationDialogService} from '../confirmation-dialog/confirmation-dialog.service';
import {Database} from '../../database/database';
import {MockDatabaseManagerService} from '../../database/mock-database-manager.service';
import {RouterTestingModule} from '@angular/router/testing';

describe('EntitySubrecordComponent', () => {
  let component: EntitySubrecordComponent;
  let fixture: ComponentFixture<EntitySubrecordComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EntitySubrecordComponent ],
      imports: [
        MatTableModule,
        MatFormFieldModule,
        MatIconModule,
        MatSnackBarModule,
        MatSelectModule,
        MatDialogModule,
        MatAutocompleteModule,
        RouterTestingModule.withRoutes([])
      ],
      providers: [
        { provide: Database, useValue: new MockDatabaseManagerService().getDatabase() },
        ConfirmationDialogService,
        EntityMapperService,
      ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EntitySubrecordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
