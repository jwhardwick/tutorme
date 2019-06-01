export class Tutor {
    id: number;
    name: string;
    cost: number;
    codes: string;
    subjects: UniSubject[];
    reviews: Review[];
    availability: Availability[];

    constructor(id, name, cost, subjects = [], reviews = [], availability = []) {
        this.id = id;
        this.name = name;
        this.cost = cost;
        this.subjects = subjects;
        this.reviews = reviews;
        this.availability = availability;
    }
}

export class UniSubject {
    uni: string;
    code: string;

    constructor(uni, code) {
        this.uni = uni;
        this.code = code;
    }
}

export class Review {
    author: string;
    tutorId: number;
    code: string;
    date: Date;
    score: 0 | 1 | 2 | 3 | 4 | 5;

    constructor(author, tutorId, code, date, score) {
        this.author = author;
        this.tutorId = tutorId;
        this.code = code;
        this.date = date;
        this.score = score;
    }

}

export class Student {
    id: number;
    name: string;

    constructor(id, name) {
        this.id = id;
        this.name = name;
    }
}

export class Availability {
    code: string;
    date: number;
    duration: number;

    constructor(code, date, duration) {
        this.code = code;
        this.date = date;
        this.duration = duration;
    }
}