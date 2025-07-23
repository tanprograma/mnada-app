import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RenderArticleComponent } from './render-article.component';

describe('RenderArticleComponent', () => {
  let component: RenderArticleComponent;
  let fixture: ComponentFixture<RenderArticleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RenderArticleComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RenderArticleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
