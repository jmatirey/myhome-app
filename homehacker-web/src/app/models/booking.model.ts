import { House } from "./house.model";
import { User } from "./user.model";

export class Booking {
    id?: string;
    
    start: Date;
    end: Date;
    user: User; // SE DEBERIA INSTANCIAR?????
    // user: string;
    // house: string;
    house: House;
    createdAt?: Date;
}
