import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TickViewComponent } from './ticket-view-admin.component';

describe('TickViewComponent', () => {
  let component: TickViewComponent;
  let fixture: ComponentFixture<TickViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TickViewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TickViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
