import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChildSelectComponent } from './child-select.component';
import {ChildBlockComponent} from '../child-block/child-block.component';
import {MatAutocompleteModule, MatFormFieldModule, MatIconModule, MatInputModule} from '@angular/material';
import {ChildrenService} from '../children.service';
import {EntityMapperService} from '../../entity/entity-mapper.service';
import {FormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import {SchoolBlockComponent} from '../../schools/school-block/school-block.component';
import {Database} from '../../database/database';
import {MockDatabaseManagerService} from '../../database/mock-database-manager.service';

describe('ChildSelectComponent', () => {
  let component: ChildSelectComponent;
  let fixture: ComponentFixture<ChildSelectComponent>;


  beforeEach(async(() => {

    TestBed.configureTestingModule({
      declarations: [ ChildSelectComponent, ChildBlockComponent, SchoolBlockComponent ],
      imports: [MatFormFieldModule, MatInputModule, MatAutocompleteModule, MatIconModule,
        FormsModule, CommonModule, NoopAnimationsModule],
      providers: [
        ChildrenService,
        EntityMapperService,
        {provide: Database, useValue: new MockDatabaseManagerService().getDatabase()}
      ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChildSelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
