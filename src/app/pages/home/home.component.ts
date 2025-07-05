import { Component } from '@angular/core';
import { DropdownLinksComponent } from '../../components/dropdown-links/dropdown-links.component';

@Component({
  selector: 'app-home',
  imports: [DropdownLinksComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  links = [
    { name: 'home', url: '/home' },
    { name: 'projects', url: '/projects' },
    { name: 'plans', url: '/plans' },
    { name: 'quotes', url: '/quotes' },
    { name: 'notes', url: '/notes' },
    { name: 'admin', url: '/admin' },
  ];
}
