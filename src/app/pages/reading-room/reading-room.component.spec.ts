import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReadingRoomComponent } from './reading-room.component';

describe('ReadingRoomComponent', () => {
  let component: ReadingRoomComponent;
  let fixture: ComponentFixture<ReadingRoomComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReadingRoomComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReadingRoomComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
