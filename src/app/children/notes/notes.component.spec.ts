import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NotesComponent } from './notes.component';
import {ChildrenService} from '../children.service';
import {UiHelperModule} from '../../ui-helper/ui-helper.module';
import {ActivatedRoute} from '@angular/router';
import {Child} from '../child';
import {SessionService} from '../../session/session.service';
import {User} from '../../user/user';
import {EntityMapperService} from '../../entity/entity-mapper.service';
import {DatePipe} from '@angular/common';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import {of} from 'rxjs';
import {Database} from '../../database/database';
import {MockDatabaseManagerService} from '../../database/mock-database-manager.service';
import {RouterTestingModule} from '@angular/router/testing';

describe('NotesComponent', () => {
  let component: NotesComponent;
  let fixture: ComponentFixture<NotesComponent>;

  const mockChildrenService = {
    getChild: (id) => {
      return of([new Child('22')]);
    },
    getNotesOfChild: (id) => {
      return of([]);
    }
  };
  let testUser;


  beforeEach(async(() => {
    testUser = new User('tester');
    testUser.name = 'tester';

    TestBed.configureTestingModule({
      declarations: [ NotesComponent ],
      imports: [
        UiHelperModule,
        NoopAnimationsModule,
      ],
      providers: [
        DatePipe,
        { provide: ActivatedRoute, useValue: {paramMap: of({get: () => '22'}) } },
        { provide: ChildrenService, useValue: mockChildrenService },
        { provide: Database, useValue: new MockDatabaseManagerService().getDatabase() },
        { provide: SessionService, useValue: { getCurrentUser() { return testUser; }} },
        EntityMapperService,
        ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NotesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
