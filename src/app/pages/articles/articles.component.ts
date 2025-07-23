import { Component, inject, OnInit } from '@angular/core';
import { StudyToolsStore } from '../../data-stores/study-tools.store';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-articles',
  imports: [RouterLink],
  templateUrl: './articles.component.html',
  styleUrl: './articles.component.scss',
})
export class ArticlesComponent implements OnInit {
  studyToolsStore = inject(StudyToolsStore);
  ngOnInit(): void {
    this.studyToolsStore.getArticles({ limit: 10 }).then((_) => {});
  }
}
