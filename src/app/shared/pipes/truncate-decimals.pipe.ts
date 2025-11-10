import { Pipe, PipeTransform, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
@Pipe({
  name: 'truncateDecimals',
  standalone: true,
})
export class TruncateDecimalsPipe implements PipeTransform {
  transform(value: number): number;
  transform(value: number, decimals: number): number;
  transform(value: number, decimals: number = 2): number {
    if (value == null || Number.isNaN(value)) {
      return 0;
    }
    const multiplier = Math.pow(10, decimals);
    return Math.floor(value * multiplier) / multiplier;
  }
}
