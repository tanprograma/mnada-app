import { Component, Input } from '@angular/core';
import { ArticleItem } from '../../interfaces/article.interface';

@Component({
  selector: 'render-article-item',
  imports: [],
  templateUrl: './render-article-item.component.html',
  styleUrl: './render-article-item.component.scss',
})
export class RenderArticleItemComponent {
  @Input() item!: ArticleItem;
}
