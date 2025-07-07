import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { ExamQuestion, MarkPayload } from '../../interfaces/exam.interface';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faAngleDown, faAngleUp } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'exam-question',
  imports: [ReactiveFormsModule, FontAwesomeModule],
  templateUrl: './exam-question.component.html',
  styleUrl: './exam-question.component.scss',
})
export class ExamQuestionComponent {
  downIcon = faAngleDown;
  upIcon = faAngleUp;
  @Input() question!: ExamQuestion;
  @Input() marked?: boolean;
  @Output() onSelect = new EventEmitter<MarkPayload>();
  formBuilder = inject(FormBuilder);
  form = this.formBuilder.group({
    answer: [{ value: '', disabled: !!this.marked }, Validators.required],
  });

  select() {
    const selected = this.form.value.answer ?? '';
    this.onSelect.emit({ item: this.question, answer: selected });
  }
  showMore = false;
  toggleMore() {
    this.showMore = !this.showMore;
  }
  selections = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'J', 'K', 'L', 'M'];
}
