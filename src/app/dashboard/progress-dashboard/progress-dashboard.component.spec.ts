import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProgressDashboardComponent } from './progress-dashboard.component';
import {
  MatButtonModule,
  MatCardModule,
  MatFormFieldModule,
  MatIconModule,
  MatInputModule,
  MatProgressBarModule
} from '@angular/material';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {EntityMapperService} from '../../entity/entity-mapper.service';
import {Database} from '../../database/database';
import {MockDatabaseManagerService} from '../../database/mock-database-manager.service';

describe('ProgressDashboardComponent', () => {
  let component: ProgressDashboardComponent;
  let fixture: ComponentFixture<ProgressDashboardComponent>;

  beforeEach(async(() => {

    TestBed.configureTestingModule({
      declarations: [ ProgressDashboardComponent ],
      imports: [ MatIconModule, MatFormFieldModule, MatInputModule, MatButtonModule, MatCardModule, MatProgressBarModule,
        CommonModule, FormsModule],
      providers: [
        { provide: Database, useValue: new MockDatabaseManagerService().getDatabase() },
        EntityMapperService,
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProgressDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
