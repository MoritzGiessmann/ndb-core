import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChildAttendanceComponent } from './child-attendance.component';
import {ActivatedRoute} from '@angular/router';
import {ChildrenService} from '../../children.service';
import {UiHelperModule} from '../../../ui-helper/ui-helper.module';
import {DatePipe, PercentPipe} from '@angular/common';
import {EntityMapperService} from '../../../entity/entity-mapper.service';
import {AttendanceDaysComponent} from '../attendance-days/attendance-days.component';
import {AttendanceDayBlockComponent} from '../attendance-days/attendance-day-block.component';
import {MatSelectModule, MatTooltipModule} from '@angular/material';
import {FormsModule} from '@angular/forms';
import {of} from 'rxjs';
import {Database} from '../../../database/database';
import {MockDatabaseManagerService} from '../../../database/mock-database-manager.service';
import {RouterTestingModule} from '@angular/router/testing';

describe('ChildAttendanceComponent', () => {
  let component: ChildAttendanceComponent;
  let fixture: ComponentFixture<ChildAttendanceComponent>;

  beforeEach(async(() => {

    TestBed.configureTestingModule({
      declarations: [ ChildAttendanceComponent, AttendanceDaysComponent, AttendanceDayBlockComponent ],
      imports: [
        UiHelperModule,
        MatSelectModule,
        FormsModule,
        MatTooltipModule,
        RouterTestingModule.withRoutes([]),
      ],
      providers: [
        { provide: ActivatedRoute, useValue: {params: of({id: '22'})} },
        { provide: Database, useValue: new MockDatabaseManagerService().getDatabase() },
        EntityMapperService,
        DatePipe,
        PercentPipe,
        EntityMapperService,
        ChildrenService,
      ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChildAttendanceComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
