import { Component, OnInit } from '@angular/core';
import {Database} from '../../database/database';
import {Child} from '../../children/child';
import {School} from '../../schools/school';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {
  results;
  searchText = '';

  constructor(private db: Database) { }

  ngOnInit() {
    this.createSearchIndex();
  }

  private createSearchIndex() {
    // `emit(x)` to add x as a key to the index that can be searched
    const searchMapFunction = 'function searchMapFunction (doc) {' +
'if (doc.hasOwnProperty("name")) {doc.name.toLowerCase().split(" ").forEach(word => emit(word));}' +
'if (doc.hasOwnProperty("entityId")) { emit(doc.entityId); }' +
'if (doc.hasOwnProperty("projectNumber")) { emit(doc.projectNumber); }  }';

    const designDoc = {
      _id: '_design/search_index',
      views: {
        by_name: {
          map: searchMapFunction
        }
      }
    };

    this.db.saveDatabaseIndex(designDoc);
  }


  search() {
    this.searchText = this.searchText.toLowerCase();
    this.db.query('search_index/by_name', {startkey: this.searchText, endkey: this.searchText + '\ufff0', include_docs: true})
      .then(queryResults => {
        this.results = queryResults.rows
          .map(r => {
            let resultEntity;
            if (r.doc._id.startsWith('Child:')) {
              resultEntity = new Child(r.doc.entityId);
            } else if (r.doc._id.startsWith('School:')) {
              resultEntity = new School(r.doc.entityId);
            } else {
              return;
            }

            Object.assign(resultEntity, r.doc);
            return resultEntity;
          })
          .filter(r => r !== undefined);
      });
  }

  clickOption(optionElement) {
    // simulate a click on the EntityBlock inside the selected option element
    optionElement._element.nativeElement.children['0'].children['0'].click();
  }

}
