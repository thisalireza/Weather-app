import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LeftContainer } from './left-container';

describe('LeftContainer', () => {
  let component: LeftContainer;
  let fixture: ComponentFixture<LeftContainer>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LeftContainer]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LeftContainer);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
