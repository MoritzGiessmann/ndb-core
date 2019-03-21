import {Injectable} from '@angular/core';
import {School} from './school';
import {EntityMapperService} from '../entity/entity-mapper.service';
import {from, Observable} from 'rxjs';
import {ChildSchoolRelation} from '../children/childSchoolRelation';
import {Database} from '../database/database';
import {Child} from '../children/child';
import {ChildWithRelation} from '../children/childWithRelation';
import * as uniqid from 'uniqid';
@Injectable()
export class SchoolsService {

  constructor(private entityMapper: EntityMapperService, private db: Database) {
  }

  createSchool(): School {
    return new School(uniqid());
  }

  getSchools(): Observable<School[]> {
    return from(this.entityMapper.loadType<School>(School));
  }

  getSchool(id: string): Observable<School> {
    return from(this.entityMapper.load<School>(School, id));
  }

  saveSchool(school: School, forceUpdate: boolean = false): Observable<any> {
    return from(this.entityMapper.save<School>(school, forceUpdate));
  }

  deleteSchool(school: School): Observable<any> {
    return from(this.entityMapper.remove<School>(school));
  }

  /***
   * Index is set int he ChildrenService
   * @param schoolId school you want relations for
   */
  queryRelationsOfSchool(schoolId: string): Promise<ChildSchoolRelation[]> {
    return this.db.query('childSchoolRelations_index/by_school', {key: schoolId, include_docs: true})
      .then(loadedEntities => {
        return loadedEntities.rows.map(loadedRecord => {
          const entity = new ChildSchoolRelation('');
          entity.load(loadedRecord.doc);
          return entity;
        });
      });
  }

  async getChildrenForSchool(schoolId: string): Promise<ChildWithRelation[]> {
    const relations = await this.queryRelationsOfSchool(schoolId);
    const children: ChildWithRelation[] = [];
    for (const relation of relations) {
      const child = await this.entityMapper.load<Child>(Child, relation.childId);
      children.push(new ChildWithRelation(child, relation));
    }
    return children;
  }
}
