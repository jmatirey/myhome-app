import { Pipe, PipeTransform } from '@angular/core';
import { House } from '../../models/house.model';

@Pipe({
  name: 'showMap'
})
export class ShowMapPipe implements PipeTransform {
  
  transform(houses: Array<House>, pattern: string): boolean {    
    return houses.filter(house => house.price <= Number(pattern)).length > 0
  }
  
}
