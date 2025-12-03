import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FactChecking } from './fact-checking';

describe('FactChecking', () => {
  let component: FactChecking;
  let fixture: ComponentFixture<FactChecking>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FactChecking]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FactChecking);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
