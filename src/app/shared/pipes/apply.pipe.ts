import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'apply',
  standalone: true
})
export class ApplyPipe implements PipeTransform {
  transform(value: any, pipe: PipeTransform, ...args: any[]): any {
    if (!pipe) {
      return value;
    }
    return pipe.transform(value, ...args);
  }
}

