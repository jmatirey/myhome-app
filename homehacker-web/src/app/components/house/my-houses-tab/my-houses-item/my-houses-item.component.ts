import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { House } from '../../../../models/house.model';
import { HomeService } from '../../../../shared/services/home.service';
import { ApiError } from '../../../../models/api-error.model';

@Component({
  selector: 'app-my-houses-item',
  templateUrl: './my-houses-item.component.html',
  styleUrls: ['./my-houses-item.component.css']
})
export class MyHousesItemComponent implements OnInit {
  
  constructor(private homeService: HomeService){}
  @Input() housePerUser: House;
  apiError: ApiError;
  
  ngOnInit() {
    
  }
  
  onClickRemoveHouse(id: string): void{
    this.homeService.deleteHouseOfUser(id).subscribe(() => {},
    (error: ApiError) => {
      this.apiError = error;
    }
  )
}

}
