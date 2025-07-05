import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompletedFilterComponent } from './completed-filter.component';

describe('CompletedFilterComponent', () => {
  let component: CompletedFilterComponent;
  let fixture: ComponentFixture<CompletedFilterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CompletedFilterComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CompletedFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
