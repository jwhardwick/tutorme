import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  public category: 'student' | 'tutor' = 'tutor';

  constructor() { }

  ngOnInit() {
  }

  selectCategory(category: 'student' | 'tutor') {
    this.category = category;
  }

}
