import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChildBlockComponent } from './child-block.component';
import {RouterTestingModule} from '@angular/router/testing';
import {Child} from '../child';
import {SchoolBlockComponent} from '../../schools/school-block/school-block.component';
import {MatIconModule} from '@angular/material';
import {EntityMapperService} from '../../entity/entity-mapper.service';
import {ChildrenService} from '../children.service';
import {Database} from '../../database/database';
import {ChildWithRelation} from '../childWithRelation';
import {MockDatabaseManagerService} from '../../database/mock-database-manager.service';

describe('ChildBlockComponent', () => {
  let component: ChildBlockComponent;
  let fixture: ComponentFixture<ChildBlockComponent>;


  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SchoolBlockComponent, ChildBlockComponent ],
      imports: [
        RouterTestingModule.withRoutes([]),
        MatIconModule
      ],
      providers: [
        EntityMapperService,
        ChildrenService,
        {provide: Database, useValue: new MockDatabaseManagerService().getDatabase()},
      ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChildBlockComponent);
    component = fixture.componentInstance;
    component.entity = new ChildWithRelation(new Child(''));
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
