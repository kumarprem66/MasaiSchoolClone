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

  adminSubmit(){

    if(this.adminForm.valid){
      const admin_data = this.adminForm.value
      console.log(admin_data)
  
     
      this.adminSer.loginAdmin(admin_data.email,admin_data.password).subscribe((res:any)=>{
        alert(res.message)

        localStorage.setItem("masaischoolclone",admin_data.email);
        localStorage.setItem("who_is_login","admin");
  
        this.router.navigate(['/admin-dashboard']);
      },(error)=>{
        alert(error.error)
      })
    }else{
      alert("every field is mandatory")
    }
   
  


  
  }


  refreshPage(){
    this.router.navigate(['./'], { skipLocationChange: false });
  }

}
