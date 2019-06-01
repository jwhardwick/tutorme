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
      for (let i = 0; i < Math.random() * 10; i++) {
        const score = i % 3 + 3;
        const date = Date.now() - Math.floor(Math.random() * 1000000000);
        const code = randomSubject.code;
        const review = new Review('Anonymous', tutor.id, randomSubject.code, date, score);
        tutor.reviews.push(review);
      }
      tutor.subjects.push(randomSubject);
  
      const availDate = Date.now() + Math.floor(Math.random() * 1000000000);
      tutor.availability.push(new Availability(randomSubject.code, availDate, 60));
    }
    tutor.codes = tutor.subjects.reduce((acc, cur) => acc += cur.code, '');
    return tutor;
  }

  public getRandomAbout() {
    const abouts = [
      ''
    ]
  }

  public getRandomExperience() {

  }

  public getRandomCost() {

  }

 }
