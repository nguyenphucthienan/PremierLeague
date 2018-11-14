import { Pipe, PipeTransform } from '@angular/core';
import { KitType } from 'src/app/core/models/kit.interface';

@Pipe({
  name: 'kitType'
})
export class KitTypePipe implements PipeTransform {

  transform(kitType: KitType, args?: any): string {
    switch (kitType) {
      case KitType.HomeKit:
        return 'Home Kit';
      case KitType.AwayKit:
        return 'Away Kit';
      case KitType.ThirdKit:
        return 'Third Kit';
      default:
        return '';
    }
  }

}
