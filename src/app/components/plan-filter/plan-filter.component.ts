import { Component, EventEmitter, inject, Output } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { faSearch, faRefresh } from '@fortawesome/free-solid-svg-icons';
import { RequestQuery } from '../date-filter/date-filter.component';
import { ProjectStore } from '../../data-stores/project.store';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { GeneralObject } from '../../interfaces/general-object.interface';

@Component({
  selector: 'plan-filter',
  imports: [ReactiveFormsModule, FontAwesomeModule],
  templateUrl: './plan-filter.component.html',
  styleUrl: './plan-filter.component.scss',
})
export class PlanFilterComponent {
  @Output() onFilter = new EventEmitter<GeneralObject<any>>();
  @Output() onReset = new EventEmitter<boolean>();
  projectStore = inject(ProjectStore);
  searchIcon = faSearch;
  refreshIcon = faRefresh;
  formBuilder = inject(FormBuilder);
  form = this.formBuilder.group({
    project: [''],
    start: [''],
    end: [''],
  });
  filter() {
    if (
      !this.form.value.end &&
      !this.form.value.start &&
      !this.form.value.project
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
      start: this.form.value.start ?? '',
      end: this.form.value.end ?? '',
      project: this.form.value.project ?? '',
    };

    if (!!ogQuery.project) {
      query['project'] = this.projectStore.findProject(ogQuery.project)._id;
      // query['start'] = this.parseDate(ogQuery.start);
    }
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
