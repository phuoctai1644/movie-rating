import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Genre } from '../../models';
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
  @Output() click = new EventEmitter<Genre>();

  onClickGenre() {
    this.click.emit(this.genre);
  }
}
