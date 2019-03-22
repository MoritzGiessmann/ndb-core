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

import { MockDatabase } from './mock-database';
import {ChildSchoolRelation} from '../children/childSchoolRelation';

describe('MockDatabase tests', () => {
  let database: MockDatabase;

  beforeEach(() => {
    database = new MockDatabase();
  });

  it('get object by _id after put into database', function (done) {
    const id = 'test_id';
    const name = 'test';
    const count = 42;
    const testData = {_id: id, name: name, count: count};

    database.put(testData).then(
      function () {
        expectIdInDatabase(testData._id, done);
      },
      function () {
        expect(false).toBe(true, 'promise of Database.put failed');
      }
    );
  });


  it('put two objects with different _id', function (done) {
    const data1 = {_id: 'test_id', name: 'test'};
    const data2 = {_id: 'other_id', name: 'test2'};

    database.put(data1).then(
      function () {
        database.put(data2).then(
          function () {
            expectIdInDatabase(data1._id, () => {}).then(function () {
                expectIdInDatabase(data2._id, done);
              }
            );
          },
          function () {
            expect(false).toBe(true, 'promise of Database.put failed');
          }
        );
      },
      function () {
        expect(false).toBe(true, 'promise of Database.put failed');
      }
    );
  });


  it('fails to get by not existing _id', function (done) {
    database.get('some_id').then(
      function () {
        expect(true).toBe(false, 'retrieved object despite get on non-existing _id');
        done();
      },
      function (err: any) {
        expect(err).toBeDefined();
        done();
      }
    );
  });


  it('rejects putting new object with existing _id and no _rev', function (done) {
    const testData = {_id: 'test_id', name: 'test', count: 42};
    const duplicateData = {_id: 'test_id', name: 'duplicate', count: 43};

    database.put(testData).then(
      function () {
        expectIdInDatabase(testData._id, () => {});

        database.put(duplicateData).then(
          function () {
            expect(true).toBe(false, 'succeeded adding duplicate _id to database');
          },
          function (err) {
            expect(err).toBeDefined();
            database.get(testData._id).then(
              function (result) {
                expect(result.name).toBe(testData.name, 'original record was overwritten');
                done();
              }
            );
          }
        )
      }
    );
  });


  it('remove object', function (done) {
    const id = 'test_id';
    const name = 'test';
    const count = 42;
    const testData = {_id: id, name: name, count: count};

    database.put(testData).then(
      function () {
        expectIdInDatabase(testData._id, function () {})
          .then(function () {
            database.remove(testData).then(
              function () {
                expectIdNotInDatabase(testData._id, done)
              },
              function () {
                expect(false).toBe(true, 'promise of Database.remove failed');
                done();
              }
            )
          }
        );
      },
      function () {
        expect(false).toBe(true, 'promise of Database.put failed');
        done();
      }
    );
  });


  it('getAll returns all objects', function (done) {
    const testData1 = {_id: 'x:test_id', name: 'test', count: 42};
    const testData2 = {_id: 'y:two', name: 'two'};

    database.put(testData1).then(() => {
      database.put(testData2).then(() => {
        database.getAll().then(
          function (resultData) {
            expect(resultData.findIndex(o => o._id === testData1._id))
              .toBeGreaterThan(-1, 'testData1 not found in getAll result');
            expect(resultData.findIndex(o => o._id === testData2._id))
              .toBeGreaterThan(-1, 'testData2 not found in getAll result');
            expect(resultData.length)
              .toBe(2, 'getAll result has ' + resultData.length + ' not expected number of objects');
            done();
          });
      })
    });
  });

  it('getAll returns prefixed objects', function (done) {
    const testData1 = {_id: 'x:test_id', name: 'test', count: 42};
    const testData2 = {_id: 'y:two', name: 'two'};
    const prefix = 'x';

    // default options for "getAll()": this.allDocs({include_docs: true, startkey: prefix, endkey: prefix + '\ufff0'});
    database.put(testData1).then(() => {
      database.put(testData2).then(() => {
        database.getAll(prefix).then(
          function (resultData) {
            expect(resultData.findIndex(o => o._id === testData1._id))
              .toBeGreaterThan(-1, 'testData1 not found in getAll result');
            expect(resultData.findIndex(o => o._id === testData2._id))
              .toBe(-1, 'testData2 unexpectedly found in getAll result despite other prefix');
            expect(resultData.length)
              .toBe(1, 'getAll result has ' + resultData.length + ' not expected number of objects');
            done();
          });
      })
    });
  });

  it('returns ChildSchoolRelations in correct order', function (done) {
    const rel1: any = new ChildSchoolRelation('1');
    rel1._id = ChildSchoolRelation.ENTITY_TYPE + '1';
    rel1.childId = '1';
    rel1.start = new Date().toString();
    const rel2: any = new ChildSchoolRelation('2');
    rel2._id = ChildSchoolRelation.ENTITY_TYPE + '2';
    rel2.childId = '1';
    rel2.start = new Date('01/01/2000').toString();
    const rel3: any = new ChildSchoolRelation('3');
    rel3._id = ChildSchoolRelation.ENTITY_TYPE + '3';
    rel3.childId = '1';
    rel3.start = new Date('01/02/2000').toString();

    database.put(rel1)
      .then(() => database.put(rel2))
      .then(() => database.put(rel3))
      .then(() => {
        database.query('childSchoolRelations_index/by_date', {endkey: '1'})
          .then(res => {
            for (let i = 0; i < res.rows.length; i++) {
              expect(res.rows[i].doc.childId).toBe('1');
              for (let j = i; j < res.rows.length; j++) {
                expect(new Date(res.rows[i].doc.start).valueOf()).not.toBeLessThan(new Date(res.rows[j].doc.start).valueOf())
              }
            }
            done()
          })
      })
      .catch(err => fail(err));
  });

  function expectIdInDatabase(id, done) {
    return database.get(id).then(
      function (resultData: any) {
        expect(resultData._id).toEqual(id);
        done();
        return resultData;
      },
      function () {
        expect(false).toBe(true, 'promise of Database.get failed');
        done();
      }
    );
  }

  function expectIdNotInDatabase(id, done) {
    return database.get(id).then(
      function () {
        expect(true).toBe(false, 'unexpectedly found object in database');
        done();
      },
      function () {
        done();
      }
    );
  }

});
