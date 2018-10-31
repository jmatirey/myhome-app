import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { House } from './../../../../models/house.model';
import { HomeService } from './../../../../shared/services/home.service';
import { Router } from '@angular/router';
import { FindHomeFormComponent } from '../find-home-form/find-home-form.component';
import { ApiError } from './../../../../models/api-error.model';
import { HouseToFind } from './../../../../models/house-to-find.model';

@Component({
  selector: 'app-find-home-wrapper',
  templateUrl: './find-home-wrapper.component.html',
  styleUrls: ['./find-home-wrapper.component.css']
})
export class FindHomeWrapperComponent implements OnInit {
  apiError: ApiError;
  toggleForm: boolean = false;
  @ViewChild(FindHomeFormComponent) findHomeFormComponent: FindHomeFormComponent;
  
  constructor(private homeService: HomeService, private router: Router) { }
  
  ngOnInit() {
    
    //CUANDO TENGO APIERROR Y LUEGO LO HAGO BIEN EL ERROR SIGUE PRESENTE?????
  }
  
  findHouseToggle(){
    this.toggleForm = !this.toggleForm;
  }
  
  onSubmitFindHouse(houseToFind: HouseToFind){
    
    this.homeService.findHousesByFilter(houseToFind)
    .subscribe((houses: Array<House>) => {
      this.findHouseToggle();
    },
    (error: ApiError) => {
      this.apiError = error;
    }
  );
  
}

}
