import { Pipe, PipeTransform } from '@angular/core';

const translations: { [key: string]: string } = {
  class: 'Aula',
  review: 'Revisão',
  test: 'Teste',
};

@Pipe({
  name: 'activityCategory',
  standalone: true,
})
export class ActivityCategoryPipe implements PipeTransform {
  transform(value: string): string {
    return translations[value] || value;
  }
}
