import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RegisterService } from '../services/register.service';
import { Route, Router } from '@angular/router';
import { InstructorService } from '../services/instructor.service';
import { arLocale } from 'ngx-bootstrap/chronos';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TokendataService } from '../services/tokendata.service';

@Component({
  selector: 'app-user-auth',
  templateUrl: './user-auth.component.html',
  styleUrls: ['./user-auth.component.css']
})
export class UserAuthComponent implements OnInit{


  loginForm:FormGroup
  current_user:string = "login"

  constructor(private fb:FormBuilder,private regSer:RegisterService,
    private router:Router,private insSer:InstructorService,private tokenServ:TokendataService){
    this.loginForm = this.fb.group({
      // isIns:[false],
      // username:['',Validators.required],
      username : ['',Validators.required],
      password: ['',Validators.required]
    
    })
  }

  ngOnInit(): void {
    
  }



  loginSubmit(){
    if(this.loginForm.valid){
      const current_user = this.loginForm.value;

    const username = current_user.username;
    const password = current_user.password;

    this.regSer.login(username,password)
    .subscribe(
      (response) => {
        const authToken = response.headers.get('Authorization');
        localStorage.setItem('masaischoolclone', authToken);


        const data = response.body;

       
        localStorage.setItem('current_user_id', data.uid);
        alert("login successfully "+ username)
        location.reload();
      },
      (error) => {
        alert("Username and password did not matched");
      }
    );
  }else{
      alert("Every field is mandatory..")
  }
  }
  
}
