import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { filter, tap } from 'rxjs/operators';

@Component({
  selector: 'app-pay',
  templateUrl: './pay.component.html',
  styleUrls: ['./pay.component.scss']
})
export class PayComponent implements OnInit {

  public date: number;
  public code: string;
  public loading = true;

  constructor(
    private route: ActivatedRoute,
  ) { }

  ngOnInit() {
    this.route.params.pipe(
      tap(params => {
        this.date = Number(params.date);
        this.code = params.code;
      })
    ).subscribe(_ => this.loading = false);
  }

  getDate(timestamp: number) {
    return new Date(timestamp);
  }
}
