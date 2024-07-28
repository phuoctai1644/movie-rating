import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Genre } from '../../../core/models';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-genre',
  standalone: true,
  imports: [NgClass],
  templateUrl: './genre.component.html',
  styleUrl: './genre.component.scss'
})
export class GenreComponent {
  @Input() genre!: Genre;
  @Input() active = false;
  @Output() select = new EventEmitter<Genre>();

  onSelectGenre() {
    this.select.emit(this.genre);
  }
}
