import { Component, OnInit, ViewChild } from '@angular/core';
import { User } from '../../../models/user.model';
import { FormGroup } from '@angular/forms';
import { SessionService } from '../../../shared/services/session.service';
import { ApiError } from '../../../models/api-error.model';
import { Route, Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  @ViewChild('loginForm') loginForm: FormGroup;
  user: User = new User();
  apiError: ApiError;
  
  constructor(private sessionService: SessionService, private router: Router) { }
  
  onSubmitLogin(){    
    
    if (this.loginForm.valid) {    
      console.log('das');
      this.sessionService.authenticate(this.user).subscribe((user: User)=>{
        this.router.navigate(['/home']);
      },
      (error: ApiError)=>{
        console.log('LOGIN ERROR FRONT', error);
        this.apiError = error;
      });
    }
  }
}
