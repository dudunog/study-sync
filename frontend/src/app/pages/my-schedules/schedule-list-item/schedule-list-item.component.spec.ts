import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScheduleListItemComponent } from './schedule-list-item.component';

describe('ScheduleListItemComponent', () => {
  let component: ScheduleListItemComponent;
  let fixture: ComponentFixture<ScheduleListItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ScheduleListItemComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ScheduleListItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
