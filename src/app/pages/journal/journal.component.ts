import { Component, inject } from '@angular/core';
import { CreateJournalComponent } from '../../components/create-journal/create-journal.component';
import { JournalStore } from '../../data-stores/journal.store';

import { GeneralObject } from '../../interfaces/general-object.interface';
import { DateFilterComponent } from '../../components/date-filter/date-filter.component';
import { CancelButtonComponent } from '../../components/cancel-button/cancel-button.component';
import { Notification } from '../../data-stores/notification.store';
import { UsersStore } from '../../data-stores/users.store';

@Component({
  selector: 'journal',
  imports: [DateFilterComponent, CancelButtonComponent, CreateJournalComponent],
  templateUrl: './journal.component.html',
  styleUrl: './journal.component.scss',
})
export class JournalComponent {
  journalStore = inject(JournalStore);
  notification = inject(Notification);
  userStore = inject(UsersStore);
  ngOnInit(): void {
    if (this.authenticate()) {
      this.getJournals({ limit: 20 }).then((_) => {});
    } else {
      this.userStore.routeToLogin();
    }
  }
  async getJournals(query: GeneralObject<any> = {}) {
    await this.journalStore.getJournals(query);
  }

  async deleteJournal(id: string) {
    await this.journalStore.deleteJournal(id);
  }

  async reset() {
    this.notification.updateNotification({
      message: 'filtering journals',
      loading: true,
    });
    await this.journalStore.getJournals({ limit: 20 });
    this.notification.reset();
  }
  authenticate() {
    return this.userStore.authenticated();
  }
}
