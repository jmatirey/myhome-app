import { Component, OnInit, ViewChild, ElementRef, Input } from '@angular/core';
import { SessionService } from '../../shared/services/session.service';
import { User } from '../../models/user.model';
import { environment } from '../../../environments/environment.prod';
import { MapService } from '../../shared/services/map.service';
import { Subscription } from 'rxjs';
import { FormGroup } from '@angular/forms';
import { UserService } from '../../shared/services/user.service';
import { ApiError } from '../../models/api-error.model';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  private static readonly IMG_PREVIEW: string = 'http://www.nfscars.net/static/img/not-found.png';
  
  user: User = new User();
  apiError: ApiError;
  profileShow: boolean = true;
  formShow: boolean = false;
  imgPreview: string | ArrayBuffer = ProfileComponent.IMG_PREVIEW;
  onUserChangesSuscription: Subscription;
  @ViewChild('form') form: FormGroup;
  
  constructor(private sessionService: SessionService, private userService: UserService) { }
  
  ngOnInit() {
    
    const userId = this.sessionService.user.id;
    this.userService.get(userId).subscribe((user: User) => {
      this.user.name = user.name;
      this.user.description = user.description;
      this.user.id = user.id;
      this.user.image = user.image;
    },
    (error: ApiError) => {
      this.apiError = error;
    })
    
  }
  
  onSubmitForm(user: User = new User()): void {
    if (this.form.valid) {
      
      this.userService.edit(user).subscribe((user: User) => {
        this.form.reset();
        this.user = Object.assign(new User(), user); // ASI ES SIN MUTAR EL OBJETO!!!
        this.formShow = !this.formShow;
        this.profileShow = !this.profileShow;
      },
      (error: ApiError) => {
        this.apiError = error;
      })
    }
    
  }
  
  toggleForm() {
    this.formShow = !this.formShow;
    this.profileShow = !this.profileShow;
  }
  
  onChangeImageFile(image: HTMLInputElement): void {
    if (image.files && image.files[0]) {
      this.user.imageFile = image.files[0];
      this.renderPreviewImg(image.files[0]);
    }
  }
  
  onImgPreviewError(): void {
    this.imgPreview = ProfileComponent.IMG_PREVIEW;
    this.user.image = null;
  }
  
  private renderPreviewImg(imageFile: File): void {
    const reader = new FileReader();
    reader.readAsDataURL(this.user.imageFile);
    reader.onload = () => {
      this.imgPreview = reader.result;
    };
  }
  
}

