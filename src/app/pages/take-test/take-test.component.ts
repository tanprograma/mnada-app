import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { StudyToolsStore } from '../../data-stores/study-tools.store';
import { ExamQuestionComponent } from '../../components/exam-question/exam-question.component';
import { MarkPayload } from '../../interfaces/exam.interface';
import { Notification } from '../../data-stores/notification.store';

@Component({
  selector: 'take-test',
  imports: [ExamQuestionComponent],
  templateUrl: './take-test.component.html',
  styleUrl: './take-test.component.scss',
})
export class TakeTestComponent implements OnInit {
  testID: string | null = null;
  activeRoute = inject(ActivatedRoute);
  marked = false;
  stuydToolStore = inject(StudyToolsStore);
  notification = inject(Notification);
  async saveResults() {
    const status = await this.stuydToolStore.saveExamResult();
    if (!!status) {
      this.marked = false;
    }
  }

  setAnswer(payload: MarkPayload) {
    this.stuydToolStore.markQuestion(payload);
  }

  ngOnInit(): void {
    this.getTest().then((_) => {});
  }
  completeTest() {
    this.marked = true;
  }
  async getTest() {
    this.testID = this.activeRoute.snapshot.paramMap.get('testID');
    this.notification.updateNotification({
      message: 'loading test',
      loading: true,
    });
    await this.stuydToolStore.getExam(this.testID as string);
    this.notification.reset();
  }
}
