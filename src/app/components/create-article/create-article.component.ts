import { Component, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {
  faAdd,
  faAngleDown,
  faAngleUp,
} from '@fortawesome/free-solid-svg-icons';
import { Article, ArticleItem } from '../../interfaces/article.interface';
import { RenderArticleItemComponent } from '../render-article-item/render-article-item.component';
import { RenderArticleComponent } from '../render-article/render-article.component';
import { StudyToolsStore } from '../../data-stores/study-tools.store';
import { UsersStore } from '../../data-stores/users.store';

@Component({
  selector: 'create-article',
  imports: [FontAwesomeModule, FormsModule, RenderArticleComponent],
  templateUrl: './create-article.component.html',
  styleUrl: './create-article.component.scss',
})
export class CreateArticleComponent {
  plusIcon = faAdd;
  moreIcon = faAngleDown;
  lessIcon = faAngleUp;
  preview = false;
  studyToolsStore = inject(StudyToolsStore);
  userStore = inject(UsersStore);
  title: string = 'this is the main header';
  secondaryTitle?: string = undefined;
  articleContents: ArticleItem[] = [];
  tagOptions = ['h2', 'paragraph', 'quote'];
  showTags = false;

  togglePreview() {
    this.preview = !this.preview;
  }

  toggleShowTags() {
    this.showTags = !this.showTags;
  }

  addComponent(event: Event) {
    // adds an editable article item in the articleItems list
    const target = event.target as HTMLSelectElement;
    const value = target.value;
    switch (value) {
      case 'h2':
        this.articleContents = [
          ...this.articleContents,
          { tag: value, content: '...this is a secondary heading' },
        ];
        break;
      case 'paragraph':
        this.articleContents = [
          ...this.articleContents,
          {
            tag: value,
            content: '...this is a paragraph. edit it to customize..',
          },
        ];
        break;
      case 'quote':
        this.articleContents = [
          ...this.articleContents,
          { tag: value, content: '...this is a quote. make it your own' },
        ];
        break;

      default:
        break;
    }
    this.showTags = false;
  }
  async saveArticle() {
    const payload = this.composeArticle();

    const status = await this.studyToolsStore.createArticle(payload);
    if (!!status) {
      this.title = '..this is an example heading';
      this.secondaryTitle = undefined;
      this.articleContents = [];
    }
  }
  composeArticle(): Partial<Article> {
    return !!this.secondaryTitle
      ? {
          author: `${this.userStore.loggedUser()?.firstname} ${
            this.userStore.loggedUser()?.lastname
          }`,
          title: this.title,
          contents: this.articleContents,
          secondaryTitle: this.secondaryTitle,
        }
      : {
          author: `${this.userStore.loggedUser()?.firstname} ${
            this.userStore.loggedUser()?.lastname
          }`,
          title: this.title,
          contents: this.articleContents,
        };
  }
}
