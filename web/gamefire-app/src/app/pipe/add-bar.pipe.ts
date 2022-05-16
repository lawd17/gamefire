import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'addBar'
})

export class AddBarPipe implements PipeTransform {

  transform(text: string): string {
    return text.trim().replace(" ", "-");
  }

}
