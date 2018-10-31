import { Pipe, PipeTransform } from '@angular/core';
import { House } from '../../models/house.model';

@Pipe({
  name: 'filterByPrice'
})
export class FilterByPricePipe implements PipeTransform {
  
  transform(houses: Array<House>, pattern: number): Array<House> {
    console.log(typeof pattern);
    
    if(!houses){
      console.log('no houses');
      return [];
    } else if(!pattern){
      console.log('no pattern');
      return houses;
    }
    
    return houses = houses.filter(house => {
      return house.price <= pattern
    })
  }
  
}
