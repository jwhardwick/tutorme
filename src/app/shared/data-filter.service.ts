import { DataService } from './data.service';
import { Injectable } from '@angular/core';

import { distinctUntilChanged, map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Tutor, UniSubject } from '../models/data.model';

@Injectable()
export class DataFilterService {

  tutors$: Observable<Tutor[]>;
  subjects$: Observable<UniSubject[]>;

  constructor(public dataService: DataService) {
    this.getSourceData();
  }

  getSourceData(): void {
    this.tutors$ = this.dataService.tutors$;
    this.subjects$ = this.dataService.subjects$;
  }

  getFilteredStream(stream$: Observable<any>, query: string, includeProps?: string|string[]): Observable<any> {
    return stream$.pipe(
      map(items => items.filter(item => this.filterStream(item, query, includeProps)))
    );
  }


  filterStream(item: object, query: string, includeProps?: string|string[]): boolean {
    const lowerQuery = query.toLowerCase();

    for (const key in item) {
      if (item.hasOwnProperty(key)) {
        if (!includeProps || includeProps.indexOf(key) !== -1) {
          const val = item[key];
          if (val != null && val.toString().toLowerCase().indexOf(lowerQuery) !== -1) {
            return true;
          }
        }
      }
    }
    return false;
  }

}
