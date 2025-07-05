import {
  Component,
  EventEmitter,
  inject,
  Input,
  input,
  Output,
} from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { CompleteFilter } from '../../interfaces/complete-filter.interface';
import { query } from 'express';

@Component({
  selector: 'completed-filter',
  imports: [ReactiveFormsModule],
  templateUrl: './completed-filter.component.html',
  styleUrl: './completed-filter.component.scss',
})
export class CompletedFilterComponent {
  @Output() onFilter = new EventEmitter<CompleteFilter>();
  @Input() filterValue: string | number = 'all';
  formValues = ['all', 'completed', 'pending'];
  formBuilder = inject(FormBuilder);
  form = this.formBuilder.group({
    filter: [this.filterValue],
  });
  filter() {
    const filterValue = this.form.value.filter as CompleteFilter;
    this.onFilter.emit(filterValue);
  }
}
