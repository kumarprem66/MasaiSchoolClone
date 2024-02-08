import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { AdminService } from '../services/admin.service';
@Component({
  selector: 'app-admin-auth',
  templateUrl: './admin-auth.component.html',
  styleUrls: ['./admin-auth.component.css']
})
export class AdminAuthComponent implements OnInit{

  adminForm:FormGroup



  constructor(private fb:FormBuilder,private router:Router,private location:Location,private adminSer:AdminService){
    this.adminForm = this.fb.group({
      email : ['',Validators.required],
      password : ['',Validators.required],
    })
  }
  ngOnInit(): void {
    
  }

 
  // adminSubmit(){
  //   if(this.adminForm.valid){
  //     const current_user = this.adminForm.value;


  //   this.adminSer.loginAdmin(current_user.email,current_user.password)
  //   .subscribe(
  //     (response) => {
  //       const authToken = response.headers.get('Authorization');
  //       localStorage.setItem('masaischoolclone', authToken);


  //       const data = response.body;

       
  //       localStorage.setItem('current_user_id', data.uid);
  //       alert("login successfully "+ current_user.email)
  //       location.reload();
  //     },
  //     (error) => {
  //       console.error('HTTP error:', error);
  //     }
  //   );
  // }else{
  //     alert("Every field is mandatory..")
  // }
  // }


  refreshPage(){
    this.router.navigate(['./'], { skipLocationChange: false });
  }

}
