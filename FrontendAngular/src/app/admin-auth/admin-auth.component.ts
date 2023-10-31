import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
@Component({
  selector: 'app-admin-auth',
  templateUrl: './admin-auth.component.html',
  styleUrls: ['./admin-auth.component.css']
})
export class AdminAuthComponent implements OnInit{

  adminForm:FormGroup

  admin_ids:string[] = ["admin-prem-kumar","admin-kumar-prem"]

  constructor(private fb:FormBuilder,private router:Router,private location:Location){
    this.adminForm = this.fb.group({
      admin_id : ['',Validators.required]
    })
  }
  ngOnInit(): void {
    
  }

  adminSubmit(){

    const admin_id_value = this.adminForm.value
    console.log(admin_id_value)

    let flag = 0
    this.admin_ids.forEach(admin=>{

      console.log(admin)
    
      if(admin == admin_id_value.admin_id){
        flag = 1
        alert("success, refresh the page once")

        const id = admin_id_value.admin_id
        localStorage.setItem("sparleom-admin",id)
        localStorage.setItem("who_is_login","admin")
        
        this.router.navigate(['admin-dashboard'])


        // this.refreshPage()



      }

    })


    if(flag == 0){
      alert("Wrong credencials")
    }
  }


  refreshPage(){
    this.router.navigate(['./'], { skipLocationChange: false });
  }

}
