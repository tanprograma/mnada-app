import { Component, inject, OnInit } from '@angular/core';
import { Article } from '../../interfaces/article.interface';
import { StudyToolsStore } from '../../data-stores/study-tools.store';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Notification } from '../../data-stores/notification.store';
import { RenderArticleComponent } from '../../components/render-article/render-article.component';

@Component({
  selector: 'article-read',
  imports: [RenderArticleComponent, RouterLink],
  templateUrl: './article-read.component.html',
  styleUrl: './article-read.component.scss',
})
export class ArticleReadComponent implements OnInit {
  article: null | Article = null;
  activeRoute = inject(ActivatedRoute);
  articleID: string | null = null;
  studyToolsStore = inject(StudyToolsStore);
  notification = inject(Notification);
  ngOnInit(): void {
    this.getArticle().then((article) => {
      this.article = article;
    });
  }
  async getArticle() {
    this.articleID = this.activeRoute.snapshot.paramMap.get('id');
    this.notification.updateNotification({
      message: 'loading article',
      loading: true,
    });
    const article = await this.studyToolsStore.getArticle(
      this.articleID as string
    );
    this.notification.reset();
    return article;
  }
}
