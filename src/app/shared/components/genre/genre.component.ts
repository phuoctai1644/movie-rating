import { Component, EventEmitter, Input, Output } from '@angular/core';
import { NgClass } from '@angular/common';
import { Genre } from '../../../core/stores';

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
