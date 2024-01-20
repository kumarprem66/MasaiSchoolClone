import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RegisterService } from '../services/register.service';
import { Route, Router } from '@angular/router';
import { InstructorService } from '../services/instructor.service';
import { arLocale } from 'ngx-bootstrap/chronos';

@Component({
  selector: 'app-user-auth',
  templateUrl: './user-auth.component.html',
  styleUrls: ['./user-auth.component.css']
})
export class UserAuthComponent implements OnInit{


  loginForm:FormGroup
  current_user:string = "login"

  constructor(private fb:FormBuilder,private regSer:RegisterService,
    private router:Router,private insSer:InstructorService){
    this.loginForm = this.fb.group({
      // is_ins:[false],
      // username:['',Validators.required],
      email : ['',Validators.required],
      password: ['',Validators.required]
    
    })
  }

  ngOnInit(): void {

    // const local_user = localStorage.getItem("sparleom-user")
    // if(local_user != null){
    //   const json_local_user = JSON.parse(local_user)
    //   this.current_user = json_local_user.user_name
    // }
  
  
    
  }

  // loginSubmit(){
  //   if(this.loginForm.valid){
  //     const current_user = this.loginForm.value
     
  //     if(current_user.is_instructor){
        
       
  //     }else{
  //       this.regSer.allUsers().subscribe((response:any)=>{
  //         const all_user = response.results
  //         let temp = 0
  //         all_user.forEach((user:any) => {
  //           if(user.user_email == current_user.user_email && user.user_password == current_user.user_password){
  //             temp = 1
  //             alert("welcome")
  
  //             const id = user.user_name
  //             localStorage.setItem('sparleom_user',id)
  
  //             this.router.navigate([''])
  //             return
  //           }
  //         });
  //         if(temp == 0){
  //           alert("You Need to register first")
  //         }
  //       })
  //     }

     
  //   }
  // }


  loginSubmit(){
    if(this.loginForm.valid){
      let current_user = this.loginForm.value
  
      console.log(current_user)
  

      // if(current_user.is_ins){
      //   localStorage.setItem("who_is_login","instructor")

      // }else{
        
        this.regSer.login(current_user).subscribe((response: any) => {
      
          // let arr = response.split(',');
           
          alert("Login Successful");
          // console.log(response)
          let local_user:any = localStorage.getItem("masaiclone-user-email")
          if(local_user != null){
            local_user = JSON.parse(local_user);
            local_user.username = response.username;
            localStorage.setItem("masaiclone-user-email",JSON.stringify(local_user))
          }else{
            current_user.username = response.username 
            current_user.cart  = []
            localStorage.setItem("masaiclone-user-email",JSON.stringify(current_user))
          }
         
         


         
        
          

          // this.router.navigate([''])

          location.reload()
        
         
        },(error)=>{
          alert(error.error.text)
          // console.log(error)
        });
    
    }else{
      alert("every field is mandatory")
    }


      
    // }

  }

  
}
