import { DataService } from './../../shared/data.service';
import { Component, OnInit } from '@angular/core';
import { UniSubject, Tutor } from 'src/app/models/data.model';
import { FilterOption } from '../filter-panel/filter-panel.component';
import { DataFilterService } from 'src/app/shared/data-filter.service';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {

  tutors$: Observable<Tutor[]>;
  filteredTutors$: Observable<Tutor[]>;
  // subjects$: Observable<UniSubject[]>;

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

  filterTutors(query: any, filterOption: FilterOption): void {
    this.filteredTutors$ = this.dataFilterService.getFilteredStream(
      this.tutors$,
      query,
      filterOption.props);
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

}
