import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommentMarche } from './comment-marche';

describe('CommentMarche', () => {
  let component: CommentMarche;
  let fixture: ComponentFixture<CommentMarche>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CommentMarche]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CommentMarche);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
