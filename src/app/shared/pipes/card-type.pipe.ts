import { Pipe, PipeTransform } from '@angular/core';
import { CardType } from 'src/app/core/models/card.interface';

@Pipe({
  name: 'cardType'
})
export class CardTypePipe implements PipeTransform {

  transform(cardType: CardType, args?: any): string {
    switch (cardType) {
      case CardType.Yellow:
        return 'Yellow';
      case CardType.Red:
        return 'Red';
      default:
        return '';
    }
  }

}
