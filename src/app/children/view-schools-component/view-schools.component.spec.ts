import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import {MatIconModule, MatFormFieldModule, MatTableModule, MatDialogModule, MatDialog} from '@angular/material';

import { ViewSchoolsComponent } from './view-schools.component';
import {EntityMapperService} from '../../entity/entity-mapper.service';
import {ChildrenService} from '../children.service';
import {ChangeDetectorRef} from '@angular/core';
import {LoggingService} from '../../logging/logging.service';
import {Database} from '../../database/database';
import {MockDatabaseManagerService} from '../../database/mock-database-manager.service';
import {DemoData} from '../../database/demo-data';

describe('ViewSchoolsComponent', () => {
  let component: ViewSchoolsComponent;
  let fixture: ComponentFixture<ViewSchoolsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewSchoolsComponent ],
      imports: [
        MatIconModule,
        MatFormFieldModule,
        MatTableModule,
        MatDialogModule
      ],
      providers: [
        ChildrenService,
        EntityMapperService,
        MatDialog,
        ChangeDetectorRef,
        LoggingService,
        { provide: Database, useValue: new MockDatabaseManagerService().getDatabase()}
      ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewSchoolsComponent);
    component = fixture.componentInstance;
    component.child = DemoData.getChildEntities()[0];
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
