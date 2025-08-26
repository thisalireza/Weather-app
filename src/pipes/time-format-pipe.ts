import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'timeFormat'
})
export class TimeFormatPipe implements PipeTransform {

  transform(value: string | null | undefined): string {
    if (!value) return '';

    // Expected format: HH:mm:ss
    const parts = value.split(':');
    if (parts.length >= 2) {
      return `${parts[0]}:${parts[1]}`; // Keep only hours and minutes
    }

    return value; // Fallback if input is unexpected
  }

}
