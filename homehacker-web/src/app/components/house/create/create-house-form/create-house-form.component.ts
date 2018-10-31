import { Component, OnInit, ViewChild, Output, EventEmitter, Input, ChangeDetectorRef, ElementRef, NgZone, OnDestroy } from '@angular/core';
import { House } from './../../../../models/house.model';
import { FormGroup } from '@angular/forms';
import { HomeService } from './../../../../shared/services/home.service';
import { MapsAPILoader } from '@agm/core';
import { MapService } from '../../../../shared/services/map.service';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-create-house-form',
  templateUrl: './create-house-form.component.html',
  styleUrls: ['./create-house-form.component.css']
})
export class CreateHouseFormComponent implements OnInit, OnDestroy{
  @ViewChild('formHouseCreate') houseCreateForm: FormGroup;
  @ViewChild('search') searchElement: ElementRef;
  @Output() houseCreateSubmit: EventEmitter<House> = new EventEmitter();
  @Input() house: House = new House();
  previewImages: Array<String> = [];
  
  onCoordsCreateHouseChanges: Subscription;
  onAdressCreateHouseChanges: Subscription;
  
  constructor(private mapService: MapService, private changesDetector: ChangeDetectorRef) { }
  
  ngOnInit(){
    
    this.mapService.autoCompleteCities(this.searchElement);    
    
    this.onCoordsCreateHouseChanges = this.mapService.onCoordsChanges()
    .subscribe((location: Array<number>) => {
      this.house.location = location;                              
    })
    
    this.onAdressCreateHouseChanges = this.mapService.onAddressChanges()
    .subscribe((address: string) => {
      this.house.address = address;                        
    })
  }
  
  onClickAddAmenity(amenity: HTMLInputElement){
    let amenityValue = amenity.value;
    if (!this.house.amenities.includes(amenity.value) && amenityValue) {
      
      this.house.amenities.push(amenityValue);
    }
    amenity.value = '';  
    
  }
  
  
  onClickRemoveAmenity(amenity: string){
    this.house.amenities = this.house.amenities.filter(a => {
      return a !== amenity;
    });
  
  }
  
  onSubmitCreateHouse(){      
    if (this.houseCreateForm.valid) {      
      this.houseCreateSubmit.emit(this.house);
    }
  }
  
  onChangeImageFile(images: HTMLInputElement){
    if (images.files) {
      
      this.previewImages = [];
      for (let i = 0; i < images.files.length; i++) {        
        this.house.photos.push(images.files[i]);
        this.renderPreviewImg(images.files[i]);
      }      
    }
  }
  
  renderPreviewImg(photoFile: File){
    const reader = new FileReader();
    reader.readAsDataURL(photoFile);
    reader.onload = () => {
      this.previewImages.push(reader.result);
      this.changesDetector.markForCheck(); // ???? PARA QUE, SIN ESTO TAMBIEN SIRVE
    }
  }
  
  reset(){
    this.previewImages = [];
    this.houseCreateForm.reset();
    this.house = new House();
  }
  
  
  ngOnDestroy(){
    console.log('destroyed create house suscriptions');
    this.onCoordsCreateHouseChanges.unsubscribe();
    this.onAdressCreateHouseChanges.unsubscribe();
  }
  
}
