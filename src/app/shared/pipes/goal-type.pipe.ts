import { Pipe, PipeTransform } from '@angular/core';
import { GoalType } from 'src/app/core/models/goal.interface';

@Pipe({
  name: 'goalType'
})
export class GoalTypePipe implements PipeTransform {

  transform(goalType: GoalType, args?: any): string {
    switch (goalType) {
      case GoalType.Other:
        return 'Other';
      case GoalType.LeftFoot:
        return 'Left Foot';
      case GoalType.RightFoot:
        return 'Right Foot';
      case GoalType.Head:
        return 'Head';
      default:
        return '';
    }
  }

}
