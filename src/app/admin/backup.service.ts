import { Injectable } from '@angular/core';
import {Database} from '../database/database';
import {User} from '../user/user';
import {Papa} from 'ngx-papaparse';

@Injectable({
  providedIn: 'root'
})
/**
 * This class implements a backup-service for the user database.
 *
 * @public
 */
export class BackupService {
  static readonly SEPARATOR_ROW = '\n';
  static readonly SEPARATOR_COL = ',';

  /**
   * The constructor of the class {@link BackupService BackupService}.
   * @param db Database  The user-database.
   * @param papa Papa  A string parser.
   */
  constructor(private db: Database,
              private papa: Papa) { }


   /**
   * This method returns the elements of the user-database as a json export.
   *
   * @returns Promise<string>  The 'stringified' export of the user-database.
   *
   * @public
    */
  getJsonExport(): Promise<string> {
    return this.db.getAll()
      .then(results => {
        let res = '';
        results.forEach(r => {
          res += JSON.stringify(r) + BackupService.SEPARATOR_ROW;
        });

        return res.trim();
      });
  }


  /**
   * This method returns the csv-(comma-seperated-values)export of the user-database.
   *
   * @returns Promise<string>  A string with the csv-formatted content of the user-database.
   *
   * @public
   */
  getCsvExport(): Promise<string> {
    return this.db.getAll()
      .then(results => {
        const resultFields = ['_id', '_rev'];
        results.forEach(r => {
          for (const propertyName in r) {
            if (resultFields.indexOf(propertyName) === -1) {
              resultFields.push(propertyName);
            }
          }
        });

        return this.papa.unparse(
          {data: results, fields: resultFields},
          {quotes: true, header: true});
      });
  }


  /**
   * This method deletes the entries of the admin-database.
   *
   * @returns Promise<any>  The list, that is about to be emptied.
   *
   * @public
   */
  clearDatabase(): Promise<any> {
    const userEntityPrefix = new User('').getType() + ':';

    return this.db.getAll().then(allDocs => {
      const p = [];
      allDocs.forEach(row => {
        if (!row._id.startsWith(userEntityPrefix)) {
          // skip User entities in order to not break login!
          p.push(this.db.remove(row));
        }
      });
      return Promise.all(p);
    });
  }


  /**
   * This method imports a json-like string and adds it's contents to the database.
   *
   * @param json string  A string with json-formatted database-contend.
   * @param forceUpdate boolean
   */
  importJson(json, forceUpdate = false) {
    const promises = [];
    json.split(BackupService.SEPARATOR_ROW)
      .forEach(record => {
        promises.push(this.db.put(JSON.parse(record), forceUpdate));
      });
    return Promise.all(promises);
  }

  importCsv(csv, forceUpdate = false) {
    const promises = [];

    const parsedCsv = this.papa.parse(csv, { header: true, dynamicTyping: true, skipEmptyLines: true });
    parsedCsv.data.forEach(record => {
      // remove undefined properties
      for (const propertyName in record) {
        if (record[propertyName] === null) {
          delete record[propertyName];
        }
      }

      promises.push(this.db.put(record, forceUpdate));
    });

    return Promise.all(promises);
  }
}
