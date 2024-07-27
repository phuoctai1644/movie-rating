import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TopRatedMovieComponent } from './top-rated-movie.component';

describe('TopRatedMovieComponent', () => {
  let component: TopRatedMovieComponent;
  let fixture: ComponentFixture<TopRatedMovieComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TopRatedMovieComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TopRatedMovieComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
