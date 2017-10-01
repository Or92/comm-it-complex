import { Component, OnInit } from '@angular/core';
import { Question } from '../model/question.model';
import { QuizService } from '../quiz.service';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.css']
})
export class ViewComponent implements OnInit {
  lastPage: number;
  grade: number;
  questions: Question[];
  currentPage: number;
  subscription: Subscription;
  answers: string[];
  done: boolean;

  constructor(private quizService: QuizService) {
    this.grade = 0;
    this.currentPage = this.quizService.currentPage;
    this.done = false;
  }

  ngOnInit() {
    this.subscription = this.quizService.getCurrentPage().subscribe(res => this.currentPage = res);
    this.quizService.getQuiz().subscribe(res => {
      this.questions = res.quiz;
      this.lastPage = this.questions.length;
      this.answers = new Array<string>(this.lastPage);
    });
  }

  addAnswer(e, i) {
    this.answers[i] = e.target.value;
    console.log(this.answers);
  }

  calculateGrade(): number {
    const markPerQuestion = 100 / this.lastPage;
    for (let i = 0; i < this.lastPage; i++) {
      if (this.answers[i] === this.questions[i].correct) {
        this.grade = this.grade + markPerQuestion;
      }
    }
    this.done = true;
    return this.grade;
  }
}
