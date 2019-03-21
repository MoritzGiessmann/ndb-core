/*
 *     This file is part of ndb-core.
 *
 *     ndb-core is free software: you can redistribute it and/or modify
 *     it under the terms of the GNU General Public License as published by
 *     the Free Software Foundation, either version 3 of the License, or
 *     (at your option) any later version.
 *
 *     ndb-core is distributed in the hope that it will be useful,
 *     but WITHOUT ANY WARRANTY; without even the implied warranty of
 *     MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 *     GNU General Public License for more details.
 *
 *     You should have received a copy of the GNU General Public License
 *     along with ndb-core.  If not, see <http://www.gnu.org/licenses/>.
 */

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NavigationComponent } from './navigation.component';
import { RouterTestingModule } from '@angular/router/testing';
import {SessionService} from '../../session/session.service';
import {NavigationItemsService} from '../navigation-items.service';
import {MenuItem} from '../menu-item';
import {
  MatAutocompleteModule,
  MatButtonToggleModule, MatCardModule, MatCheckboxModule,
  MatDividerModule,
  MatExpansionModule,
  MatFormFieldModule,
  MatIconModule,
  MatListModule, MatOptionModule, MatProgressBarModule, MatSelectModule, MatTableModule, MatTooltipModule
} from '@angular/material';
import {routes} from '../../app.routing';
import {DashboardComponent} from '../../dashboard/dashboard/dashboard.component';
import {UserAccountComponent} from '../../user/user-account/user-account.component';
import {SchoolsListComponent} from '../../schools/schools-list/schools-list.component';
import {SchoolDetailComponent} from '../../schools/school-detail/school-detail.component';
import {ChildrenListComponent} from '../../children/children-list/children-list.component';
import {ChildDetailsComponent} from '../../children/child-details/child-details.component';
import {ChildAttendanceComponent} from '../../children/attendance/child-attendance/child-attendance.component';
import {NotesManagerComponent} from '../../children/notes/notes-manager/notes-manager.component';
import {AttendanceManagerComponent} from '../../children/attendance/attendance-manager/attendance-manager.component';
import {AddMonthAttendanceComponent} from '../../children/attendance/add-month-attendance/add-month-attendance.component';
import {AddDayAttendanceComponent} from '../../children/attendance/add-day-attendance/add-day-attendance.component';
import {AdminComponent} from '../../admin/admin/admin.component';
import {ChildrenCountDashboardComponent} from '../../children/children-count-dashboard/children-count-dashboard.component';
import {AttendanceWeekDashboardComponent} from '../../children/attendance/attendance-week-dashboard/attendance-week-dashboard.component';
import {ProgressDashboardComponent} from '../../dashboard/progress-dashboard/progress-dashboard.component';
import {AttendanceAverageDashboardComponent} from '../../children/attendance/attendance-average-dashboard/attendance-average-dashboard.component';
import {AttendanceWarningsDashboardComponent} from '../../children/attendance/attendance-warnings-dashboard/attendance-warnings-dashboard.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {ChildBlockComponent} from '../../children/child-block/child-block.component';
import {SchoolBlockComponent} from '../../schools/school-block/school-block.component';
import {AttendanceBlockComponent} from '../../children/attendance/attendance-block/attendance-block.component';
import {FilterPipeModule} from 'ngx-filter-pipe';
import {KeysPipe} from '../../ui-helper/keys-pipe/keys.pipe';
import {ViewSchoolsComponent} from '../../children/view-schools-component/view-schools.component';
import {AserComponent} from '../../children/aser/aser.component';
import {NotesComponent} from '../../children/notes/notes.component';
import {EducationalMaterialComponent} from '../../children/educational-material/educational-material.component';
import {AttendanceDaysComponent} from '../../children/attendance/attendance-days/attendance-days.component';
import {EntitySubrecordComponent} from '../../ui-helper/entity-subrecord/entity-subrecord.component';
import {AttendanceDayBlockComponent} from '../../children/attendance/attendance-days/attendance-day-block.component';

describe('NavigationComponent', () => {
  let component: NavigationComponent;
  let fixture: ComponentFixture<NavigationComponent>;

  let navigationItemsService: NavigationItemsService;
  let sessionService: SessionService;

  beforeEach(async(() => {
    sessionService = new SessionService(null, null, null);
    navigationItemsService = new NavigationItemsService();
    navigationItemsService.addMenuItem(new MenuItem('test', 'test-icon', []));

    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        MatIconModule,
        MatDividerModule,
        MatListModule,
        MatFormFieldModule,
        MatButtonToggleModule,
        MatExpansionModule,
        MatTableModule,
        FormsModule,
        MatCheckboxModule,
        ReactiveFormsModule,
        FilterPipeModule,
        MatOptionModule,
        MatSelectModule,
        MatProgressBarModule,
        MatCardModule,
        MatAutocompleteModule,
        MatTooltipModule,
        RouterTestingModule.withRoutes(routes)
      ],
      declarations: [
        NavigationComponent,
        DashboardComponent,
        UserAccountComponent,
        SchoolsListComponent,
        SchoolDetailComponent,
        ChildrenListComponent,
        ChildDetailsComponent,
        ChildAttendanceComponent,
        NotesManagerComponent,
        AttendanceManagerComponent,
        AddMonthAttendanceComponent,
        AddDayAttendanceComponent,
        AdminComponent,
        ChildrenCountDashboardComponent,
        AttendanceWeekDashboardComponent,
        ProgressDashboardComponent,
        AttendanceAverageDashboardComponent,
        AttendanceWarningsDashboardComponent,
        ChildBlockComponent,
        SchoolBlockComponent,
        AttendanceBlockComponent,
        ViewSchoolsComponent,
        AserComponent,
        NotesComponent,
        EducationalMaterialComponent,
        AttendanceDaysComponent,
        EntitySubrecordComponent,
        AttendanceDayBlockComponent,
        KeysPipe,
      ],
      providers: [
        {provide: SessionService, useValue: sessionService},
        {provide: NavigationItemsService, useValue: navigationItemsService},
        ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NavigationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });


   it('should be created', () => {
     expect(component).toBeTruthy();
   });

  it('should load navigation items correctly', (done) => {
    fixture.whenRenderingDone().then( () => {
      expect(component.menu_main.length).toBe(1);
      done();
    });
  });

});
