import { Pipe, PipeTransform } from '@angular/core';
import { environment } from '../../../environments/environment';

@Pipe({
  name: 'movieImage',
  standalone: true
})
export class MovieImagePipe implements PipeTransform {

  transform(path: string): string {
    return `url('${environment.imageUrl}${path}')`;
  }
}
