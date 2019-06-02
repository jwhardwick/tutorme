import { DataService } from './../../shared/data.service';
import { Component, OnInit } from '@angular/core';
import { UniSubject, Tutor } from 'src/app/models/data.model';
import { FilterOption } from '../filter-panel/filter-panel.component';
import { DataFilterService } from 'src/app/shared/data-filter.service';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { filter, map } from 'rxjs/operators';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {

  tutors$: Observable<Tutor[]>;
  filteredTutors$: Observable<Tutor[]>;
  // subjects$: Observable<UniSubject[]>;

  public query: any = '';
  public filterOption: FilterOption;

  selectedPrice: 'any' | 'low' | 'medium' | 'high' = 'any';

  public codeOption: FilterOption[] = [
    {props: ['codes'], label: 'Subject Code'}
  ];

  constructor(
    private dataService: DataService,
    private dataFilterService: DataFilterService,
    private router: Router,
  ) { }

  ngOnInit() {
    this.tutors$ = this.dataService.tutors$;
    this.filteredTutors$ = this.tutors$;
  }

  getFilterTutors(): void {
    const props = this.filterOption ? this.filterOption.props : null;
    this.filteredTutors$ = this.dataFilterService.getFilteredStream(
      this.tutors$,
      this.query,
      props).pipe(
        map(tutors => tutors.filter(tutor => this.filterTutorPrice(tutor)))
      )
  }

  getTutorRating(tutor: Tutor) {
    return Math.round(tutor.reviews.reduce((acc, cur) => acc + cur.score, 0) / tutor.reviews.length * 10) / 10;
  }

  getNextAvailiability(tutor: Tutor) {
    return new Date(Math.min(...tutor.availability.map(a => a.date)));
  }

  getDate(timestamp: number) {
    return new Date(timestamp);
  }

  selectTutor(tutor: Tutor) {
    this.router.navigate([`/view/${tutor.id}`]);
  }

  selectPrice(type: 'low' | 'medium' | 'high') {
    this.selectedPrice = type;
    this.getFilterTutors();
  }

  filterTutors(query: any, filterOption: FilterOption) {
    this.query = query;
    this.filterOption = filterOption;
    this.getFilterTutors();
  }

  filterTutorPrice(tutor: Tutor) {
    switch (this.selectedPrice) {
      case 'any': {
        return true;
      }
      case 'low': {
        return tutor.cost <= 60;
      }
      case 'medium': {
        return tutor.cost > 60 && tutor.cost < 75;
      }
      case 'high': {
        return tutor.cost >= 75;
      }
    }
  }

}
