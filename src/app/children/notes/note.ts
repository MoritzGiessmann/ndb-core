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

import { Entity } from '../../entity/entity';
import {WarningLevel} from '../attendance/warning-level';


export class Note extends Entity {
  protected static ENTITY_TYPE = 'Note';

  children: string[]; // id of Child entity
  date: Date;
  subject = '';
  text = '';
  author = '';
  category = '';
  warningLevel: WarningLevel = WarningLevel.OK;

  getWarningLevel (): WarningLevel {
    return this.warningLevel;
  }

  isLinkedWithChild(childId: string) {
    return (this.children.findIndex(e => e === childId) > -1);
  }
}