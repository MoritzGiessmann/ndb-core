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

import { environment } from '../../environments/environment';
import { PouchDatabaseManagerService } from './pouch-database-manager.service';
import { AppConfig } from '../app-config/app-config';
import { MockDatabaseManagerService } from './mock-database-manager.service';
import { DatabaseManagerService } from './database-manager.service';
import {AlertService} from '../alerts/alert.service';

export function databaseManagerServiceFactory(alertService: AlertService): DatabaseManagerService {
  if (AppConfig.settings.database.useTemporaryDatabase) {
    return new MockDatabaseManagerService();
  } else {
    return new PouchDatabaseManagerService(alertService);
  }
}

export const databaseManagerProvider = {
  provide: DatabaseManagerService,
  useFactory: databaseManagerServiceFactory,
  deps: [AppConfig, AlertService]
};
