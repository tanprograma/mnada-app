import { Component, inject } from '@angular/core';

import { Notification } from '../../data-stores/notification.store';

@Component({
  selector: 'allert-success',
  imports: [],
  templateUrl: './allert-success.component.html',
  styleUrl: './allert-success.component.scss',
})
export class AllertSuccessComponent {
  // reqState = inject(RequestAllertStore);
  reqState = inject(Notification);

  reset() {
    this.reqState.reset();
  }
}
