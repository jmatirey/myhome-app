export class User {
    id?:string;
    email: string;
    password: string;
    name?: string;
    image?: string;
    imageFile?: File; 
    description?: string;
    
    asFormData(): FormData{                
        const data = new FormData();
        
        data.append('name', this.name);
        data.append('description', this.description);
        data.append('image', this.imageFile ? this.imageFile : this.image);
        
        return data;
    }
    
}
