import { Component, Input } from '@angular/core';
import { Article } from '../../interfaces/article.interface';
import { RenderArticleItemComponent } from '../render-article-item/render-article-item.component';

@Component({
  selector: 'render-article',
  imports: [RenderArticleItemComponent],
  templateUrl: './render-article.component.html',
  styleUrl: './render-article.component.scss',
})
export class RenderArticleComponent {
  @Input() article!: Partial<Article>;
  renderDate(date: any) {
    const d = new Date(date);
    return `${d.getDate()}-${
      d.getMonth() + 1
    }-${d.getFullYear()} ${d.toLocaleTimeString()}`;
  }
}
