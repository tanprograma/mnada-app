import { Component, inject } from '@angular/core';
import { JournalStore } from '../../data-stores/journal.store';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { faAdd, faTimes } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { Notification } from '../../data-stores/notification.store';

@Component({
  selector: 'create-journal',
  imports: [ReactiveFormsModule, FontAwesomeModule],
  templateUrl: './create-journal.component.html',
  styleUrl: './create-journal.component.scss',
})
export class CreateJournalComponent {
  plusIcon = faAdd;
  // angleDown = faAngleDown;
  // angleUp = faAngleUp;
  crossIcon = faTimes;

  units: { name: string; value: number }[] = [];

  // for state management of the request
  reqState = inject(Notification);
  journalStore = inject(JournalStore);
  formBuilder = inject(FormBuilder);
  form = this.formBuilder.group({
    entry: ['', Validators.required],
  });

  async createJournal() {
    const status = await this.journalStore.createJournal({
      entry: this.form.value.entry ?? '',
    });
    if (!!status) {
      this.form.patchValue({ entry: '' });
    }
  }
}
