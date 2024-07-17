import { NgFor } from '@angular/common';
import { Component } from '@angular/core';
import { Genre } from '../../models';
import { GenreComponent } from '../genre/genre.component';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [NgFor, GenreComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  genres: Genre[] = [
    { id: 1, name: 'Drama' },
    { id: 2, name: 'Action' },
    { id: 3, name: 'Thriller' },
  ]
}
