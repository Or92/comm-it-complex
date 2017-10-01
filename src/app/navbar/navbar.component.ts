import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { QuizService } from '../quiz.service';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  public currentPage: number;
  public subscription: Subscription;
  @Input() lastPage: number;
  @Output() finished;

  constructor(private quizService: QuizService) {
    this.finished = new EventEmitter();
    this.currentPage = this.quizService.currentPage;
  }

  ngOnInit() {
    this.subscription = this.quizService.getCurrentPage().subscribe(res => {
      this.currentPage = res;
    });
  }

  handlePaging(str: string) {
    this.quizService.handlePaging(str);
  }

  quizDone() {
    this.finished.emit();
  }

}
