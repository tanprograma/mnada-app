import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RenderArticleItemComponent } from './render-article-item.component';

describe('RenderArticleItemComponent', () => {
  let component: RenderArticleItemComponent;
  let fixture: ComponentFixture<RenderArticleItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RenderArticleItemComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RenderArticleItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
