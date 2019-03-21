import {EntityMapperService} from '../entity/entity-mapper.service';
import {MockDatabaseManagerService} from '../database/mock-database-manager.service';
import {SchoolsService} from './schools.service';

describe('ChildrenService', () => {
  let service: SchoolsService;
  beforeEach(() => {
    const database = new MockDatabaseManagerService().getDatabase();
    service = new SchoolsService(new EntityMapperService(database), database)
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
