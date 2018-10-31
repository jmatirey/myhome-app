import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { RegisterService } from '../../../shared/services/register.service';
import { User } from '../../../models/user.model';
import { Router } from '@angular/router';
import { ApiError } from '../../../models/api-error.model';

@Component({
  selector: 'app-user',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  @ViewChild('registerForm') registerForm: FormGroup;
  user: User = new User();
  apiError: ApiError;
  constructor(private userService:RegisterService, private router: Router) { }
  
  ngOnInit() {
  }
  
  onSubmitRegister(){    
    if (this.registerForm.valid) {
      this.userService.createUser(this.user).subscribe((user:User)=>{
        console.log('USER CREATED', user);
        this.registerForm.reset();
        this.router.navigate(['/login']);
      },
      (error: ApiError) =>{
        this.apiError = error;
      }
    );
  }
}
}
