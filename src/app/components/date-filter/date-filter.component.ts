import { Component, EventEmitter, inject, Output } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faSearch, faRefresh } from '@fortawesome/free-solid-svg-icons';
export interface RequestQuery {
  [property: string]: string | number;
}
@Component({
  selector: 'date-filter',
  imports: [ReactiveFormsModule, FontAwesomeModule],
  templateUrl: './date-filter.component.html',
  styleUrl: './date-filter.component.scss',
})
export class DateFilterComponent {
  @Output() onFilter = new EventEmitter<RequestQuery>();
  @Output() onReset = new EventEmitter<boolean>();

  searchIcon = faSearch;
  refreshIcon = faRefresh;
  formBuilder = inject(FormBuilder);
  form = this.formBuilder.group({
    store: [''],
    start: [''],
    end: [''],
  });
  filter() {
    if (
      !this.form.value.end &&
      !this.form.value.start &&
      !this.form.value.store
    ) {
      console.log('empty query');
      return;
    }
    const query = this.buildQuery();

    this.onFilter.emit(query);
  }
  reset() {
    this.form.reset();
    this.onReset.emit(true);
  }
  buildQuery() {
    const query: RequestQuery = {};
    const ogQuery = {
      store: this.form.value.store ?? '',
      start: this.form.value.start ?? '',
      end: this.form.value.end ?? '',
    };

    if (!!ogQuery.start) {
      query['start'] = this.parseDate(ogQuery.start);
    }
    if (!!ogQuery.end) {
      query['end'] = this.parseDate(ogQuery.end);
    }
    return query;
  }
  parseDate(d: string) {
    return new Date(d).getTime();
  }
}
