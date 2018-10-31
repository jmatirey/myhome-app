import { Component, OnInit, ViewChild, Output, Input, ElementRef } from '@angular/core';
import { House } from './../../../../models/house.model';
import { FormGroup } from '@angular/forms';
import { HomeService } from './../../../../shared/services/home.service';
import { EventEmitter } from '@angular/core';
import { ApiError } from './../../../../models/api-error.model';
import { HouseToFind } from './../../../../models/house-to-find.model';
import { MapService } from '../../../../shared/services/map.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-find-home-form',
  templateUrl: './find-home-form.component.html',
  styleUrls: ['./find-home-form.component.css']
})
export class FindHomeFormComponent implements OnInit {
  house: HouseToFind = new HouseToFind();
  @ViewChild('formHouseFind') formHouseFind: FormGroup;
  @Input() apiError: ApiError;
  @Output() houseFindSubmit: EventEmitter<HouseToFind> = new EventEmitter();
  @ViewChild('search') searchElement: ElementRef;
  onCoordsFindHomeChanges: Subscription;
  onAdressFindHomeChanges: Subscription;
  
  constructor(private mapService: MapService, private homeService: HomeService) { }
  
  ngOnInit() {
    this.mapService.autoCompleteCities(this.searchElement);
    
    this.onCoordsFindHomeChanges = this.mapService.onCoordsChanges()
    .subscribe((location: Array<number>) => {
      this.house.location = location;
    })
    
    this.onAdressFindHomeChanges = this.mapService.onAddressChanges()
    .subscribe((address: string) => {
      this.house.address = address;
    })
    
  }
  
  onSubmitFindHouse(){    
    if (this.formHouseFind.valid) {
      console.log(this.house);
      
      this.houseFindSubmit.emit(this.house);
    }
  }
  
  reset(){
    this.formHouseFind.reset();
  }
  
}
