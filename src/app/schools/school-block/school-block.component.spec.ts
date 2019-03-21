import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SchoolBlockComponent } from './school-block.component';
import {RouterTestingModule} from '@angular/router/testing';
import {MatIconModule} from '@angular/material';
import {EntityMapperService} from '../../entity/entity-mapper.service';
import {School} from '../school';
import {ChildrenService} from '../../children/children.service';
import {MockDatabaseManagerService} from '../../database/mock-database-manager.service';
import {Database} from '../../database/database';
import {routes} from '../../app.routing';

describe('SchoolBlockComponent', () => {
  let component: SchoolBlockComponent;
  let fixture: ComponentFixture<SchoolBlockComponent>;

  beforeEach(async(() => {

    TestBed.configureTestingModule({
      declarations: [ SchoolBlockComponent ],
      imports: [MatIconModule, RouterTestingModule.withRoutes([])],
      providers: [
        EntityMapperService,
        ChildrenService,
        {provide: Database, useValue: new MockDatabaseManagerService().getDatabase()},
      ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SchoolBlockComponent);
    component = fixture.componentInstance;
    component.entity = new School('');
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
