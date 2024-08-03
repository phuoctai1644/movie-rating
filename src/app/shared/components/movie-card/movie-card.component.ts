// Core, Common
import { Component, Input } from '@angular/core';
import { DecimalPipe, NgStyle } from '@angular/common';
// Model
import { MovieShort } from '../../../core/stores';
// Pipe
import { MovieImagePipe } from '../../pipes/movie-image.pipe';
import { GenreShortLabelPipe } from './movie-card.pipe';

@Component({
  selector: 'app-movie-card',
  standalone: true,
  imports: [MovieImagePipe, NgStyle, GenreShortLabelPipe, DecimalPipe],
  templateUrl: './movie-card.component.html',
  styleUrl: './movie-card.component.scss'
})
export class MovieCardComponent {
  @Input() movie!: MovieShort;
}
