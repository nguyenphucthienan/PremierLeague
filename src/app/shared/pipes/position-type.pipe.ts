import { Pipe, PipeTransform } from '@angular/core';
import { PositionType } from 'src/app/core/models/player.interface';

@Pipe({
  name: 'positionType'
})
export class PositionTypePipe implements PipeTransform {

  transform(positionType: PositionType, args?: any): string {
    switch (positionType) {
      case PositionType.GoalKeeper:
        return 'Goalkeeper';
      case PositionType.Defender:
        return 'Defender';
      case PositionType.Midfielder:
        return 'Midfielder';
      case PositionType.Forward:
        return 'Forward';
      default:
        return '';
    }
  }

}
