import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SchoolsListComponent } from './schools-list.component';
import {
  MatButtonToggleModule,
  MatExpansionModule,
  MatFormFieldModule,
  MatIconModule,
  MatInputModule,
  MatSortModule,
  MatTableModule
} from '@angular/material';
import {FormsModule} from '@angular/forms';
import {Database} from '../../database/database';
import {SchoolsService} from '../schools.service';
import {EntityMapperService} from '../../entity/entity-mapper.service';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MockDatabaseManagerService} from '../../database/mock-database-manager.service';
import {RouterTestingModule} from '@angular/router/testing';

describe('SchoolsListComponent', () => {
  let component: SchoolsListComponent;
  let fixture: ComponentFixture<SchoolsListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SchoolsListComponent ],
      imports: [
        MatTableModule,
        MatFormFieldModule,
        MatInputModule,
        MatSortModule,
        MatIconModule,
        MatButtonToggleModule,
        MatExpansionModule,
        FormsModule,
        BrowserAnimationsModule,
        RouterTestingModule.withRoutes([])
      ],
      providers: [
        SchoolsService,
        EntityMapperService,
        {provide: Database, useValue: new MockDatabaseManagerService().getDatabase()},
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SchoolsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
