import { DataService } from './../../shared/data.service';
import { Component, OnInit, Input } from '@angular/core';
import { Tutor } from 'src/app/models/data.model';
import { ActivatedRoute } from '@angular/router';
import { flatMap, filter, tap, map } from 'rxjs/operators';

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.scss']
})
export class ViewComponent implements OnInit {

  public tutor: Tutor;

  constructor(
    private route: ActivatedRoute,
    private data: DataService,
  ) { }

  ngOnInit() {
    this.route.params.pipe(
      filter(params => !!params.tutorId),
      tap(params => {
        // debugger;
        this.getTutor(Number(params.tutorId))
      })
    ).subscribe();
  }

  getTutor(tutorId: number) {
    this.data.tutors$.pipe(
      map(tutors => tutors.find(tutor => tutor.id === tutorId)),
      tap(tutor => {
        // debugger;
        this.tutor = tutor
      })
    ).subscribe();
  }

  getAbout() {
    return this.data.getRandomAbout(this.tutor);
  }

  getExperience() {
    return this.data.getRandomExperience(this.tutor);
  }

  getDate(timestamp: number) {
    return new Date(timestamp);
  }

}
