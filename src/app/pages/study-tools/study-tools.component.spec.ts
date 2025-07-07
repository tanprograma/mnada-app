import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudyToolsComponent } from './study-tools.component';

describe('StudyToolsComponent', () => {
  let component: StudyToolsComponent;
  let fixture: ComponentFixture<StudyToolsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StudyToolsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StudyToolsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
