import { Booking } from "./booking.model";
import { User } from "./user.model";

export class House {
    id?:string; //?no estara cuando yo lo cree pero si cuando lo reciba
    name: string;
    owner?: User;
    price: number;
    start: Date; 
    end: Date;
    photos: Array<File> = []; 
    description:string;
    people: number;
    amenities?: Array<string> = [];
    location: Array<number>;
    address: string;
    bookings: Booking[]; //!!!!
    
    public asFormData(): FormData{
        const data = new FormData();
        
        data.append('name', this.name);
        data.append('price', (this.price).toString());
        data.append('start', (this.start).toString());
        data.append('end', (this.end).toString());
        data.append('description', this.description);
        data.append('people', (this.people).toString());
        data.append('location', (this.location).toString());
        data.append('address', this.address);
        
        
        for (const amenity of this.amenities) {
            data.append('amenities', amenity);
        }
        
        for (const photo of this.photos) {
            data.append('photos', photo);
        }
        
        return data;
    }
    
}
