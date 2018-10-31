/// <reference types="googlemaps" />
import { Injectable, ElementRef, NgZone } from '@angular/core';
import { MapsAPILoader } from '@agm/core';
import { Subject, Observable } from 'rxjs';

declare var google;

@Injectable({
  providedIn: 'root'
})
export class MapService {
  public static readonly LOCATION_KEY = 'location';
  
  place: google.maps.places.PlaceResult;
  location:  Array<Number> = [];
  address: string;
  coordsSubject = new Subject();
  addressSubject = new Subject();
  
  constructor(private mapsAPILoader: MapsAPILoader, private ngZone: NgZone) { }
  autoCompleteCities(searchElement: ElementRef) {
    this.mapsAPILoader.load()
    .then(() => {
      console.log(searchElement);
      
      const autocomplete = new google.maps.places.Autocomplete(searchElement.nativeElement, { types: [] });
      
      autocomplete.addListener('place_changed', () => {
        this.ngZone.run(() => {
          this.place = autocomplete.getPlace();
          
          this.location = [];
          this.location.push(this.place.geometry.location.lng())
          this.location.push(this.place.geometry.location.lat())
          console.log(this.location);
          
          this.address = this.place.formatted_address;
          this.notifyCoords();
          this.notifyAddress();
          
          if (this.place.geometry === undefined || this.place.geometry === null) {
            return;
          } 
        });
      });
    });
  }
  
  notifyCoords():void{
    this.coordsSubject.next(this.location);
  }
  notifyAddress():void{
    this.addressSubject.next(this.address);
  }
  
  onCoordsChanges(){
    return this.coordsSubject.asObservable();
  }
  onAddressChanges(){
    return this.addressSubject.asObservable();
  }
  
}


