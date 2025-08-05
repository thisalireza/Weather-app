import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RightContainer } from './right-container';

describe('RightContainer', () => {
  let component: RightContainer;
  let fixture: ComponentFixture<RightContainer>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RightContainer]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RightContainer);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
