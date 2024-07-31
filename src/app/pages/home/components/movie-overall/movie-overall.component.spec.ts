import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MovieOverallComponent } from './movie-overall.component';

describe('MovieOverallComponent', () => {
  let component: MovieOverallComponent;
  let fixture: ComponentFixture<MovieOverallComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MovieOverallComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MovieOverallComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
