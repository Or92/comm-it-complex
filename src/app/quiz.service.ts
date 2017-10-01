import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import { Subject } from 'rxjs/Subject';
import { Quiz } from './model/quiz.model';

@Injectable()
export class QuizService {
  public currentPage: number;
  public lastPage: number;
  public updateCurrentPageSubject: Subject<number>;

  constructor(private http: HttpClient) {
    this.updateCurrentPageSubject = new Subject<number>();

    this.currentPage = 1;
    this.getQuiz().subscribe(res => {
      this.lastPage = res.quiz.length;
    });
  }

  getQuiz(): Observable<Quiz> {
    return this.http.get('/assets/data/quiz.json');
  }

  next(): void {
    this.currentPage++;
  }

  prev(): void {
    this.currentPage--;
  }

  handlePaging(str?: string) {
    switch (str) {
      case 'next':
        this.next();
        this.updateCurrentPageSubject.next(this.currentPage);
        break;
      case 'prev':
        this.prev();
        this.updateCurrentPageSubject.next(this.currentPage);
        break;
      default:
        this.updateCurrentPageSubject.next(1);
    }
  }

  getCurrentPage(): Observable<number> {
    return this.updateCurrentPageSubject.asObservable();
  }

}
