import { UniSubject, Review, Availability } from './../models/data.model';
import { Injectable } from '@angular/core';
import { Tutor } from '../models/data.model';
import { BehaviorSubject } from 'rxjs';
import { Data } from './data';

@Injectable()
export class DataService {

  private _tutors$ = new BehaviorSubject<Tutor[]>([]);
  private _subjects$ = new BehaviorSubject<UniSubject[]>([]);


  private dataStore: {
    tutors: Tutor[],
    subjects: UniSubject[]
  }

  constructor() {
    this.dataStore = {
      tutors: [],
      subjects: []
    }

    this._loadData();
  }

  get tutors$() {
    return this._tutors$.asObservable();
  }

  get subjects$() {
    return this._subjects$.asObservable();
  }

  private _loadData() {
    this.dataStore.tutors = Data.tutorData.map(tutor => this._addTutorData(tutor));
    this._tutors$.next(this.dataStore.tutors);
    this.dataStore.subjects = Data.subjectData;
    this._subjects$.next(this.dataStore.subjects);
  }

  private _addTutorData(tutor: Tutor) {
    for (let j = 0; j < Math.max(1, Math.random() * 5); j++) {
      const randomSubject = Data.subjectData[Math.floor(Math.random() * Data.subjectData.length)];
      for (let i = 0; i < Math.random() * 3; i++) {
        const score = i % 3 + 3;
        const date = Date.now() - Math.floor(Math.random() * 10000000000);
        const code = randomSubject.code;
        const review = new Review('Anonymous', tutor.id, randomSubject.code, date, score);
        tutor.reviews.push(review);
        const availDate = Date.now() + Math.floor(Math.random() * 1000000000);
        tutor.availability.push(new Availability(randomSubject.code, availDate, 60));
      }
      tutor.subjects.push(randomSubject);
  
    }
    tutor.availability = tutor.availability.sort((a,b) => a.date - b.date);
    tutor.codes = tutor.subjects.reduce((acc, cur) => acc += cur.code, '');
    return tutor;
  }

  public getRandomAbout(tutor: Tutor) {
    const data = [
      `Hi my name is ${tutor.name}, and I am a passionate ${this.rand() ? 'current' : 'former'} student. I enjoy taking the time to teach people in a 1 on 1 setting.`,
      `Welcome to my page, I'm ${tutor.name}. I am a ${this.rand() ? 'current' : 'former'} student that loves Computer Science.`
    ]
    return data[Math.floor(Math.random() * data.length)];
  }

  public getRandomExperience(tutor: Tutor) {
    const data = [
      `I have over ${this.rand() ? '2' : '4'} years experience tutoring. ${this.rand() ? 'I have been an official tutor through my university.' : 'I have tutored privately outside of my university.'}`
    ]
    return data[Math.floor(Math.random() * data.length)];
  }

  public getRandomCost() {

  }

  public rand() {
    return Math.random() * 2 >= 1;
  }

 }
