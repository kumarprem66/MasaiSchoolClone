import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RegisterService } from '../services/register.service';
import { arLocale } from 'ngx-bootstrap/chronos';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-register',
  templateUrl: './user-register.component.html',
  styleUrls: ['./user-register.component.css']
})
export class UserRegisterComponent implements OnInit{

  userData:FormGroup
  constructor(private fb:FormBuilder,private regSer:RegisterService,private router:Router){
    this.userData = this.fb.group({
      username : ['',Validators.required],
      email : ['',Validators.required],
      password: ['',Validators.required],

    })
  }
  ngOnInit(): void {
    
  
  }

  userRegister(){

   if(this.userData.valid){
    const uservalue = this.userData.value
    console.log(uservalue)

    
    this.regSer.userRegister(uservalue).subscribe((response)=>{
      alert("Registered")
      this.router.navigate(['login'])
      console.log(uservalue)
    })
   }else{
    alert("every field need valid data")
   }
  }




}
