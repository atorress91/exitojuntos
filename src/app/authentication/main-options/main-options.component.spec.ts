import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MainOptionsComponent } from './main-options.component';

describe('MainOptionsComponent', () => {
  let component: MainOptionsComponent;
  let fixture: ComponentFixture<MainOptionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MainOptionsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MainOptionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
