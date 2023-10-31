import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RegisterService } from '../services/register.service';
import { Route, Router } from '@angular/router';
import { InstructorService } from '../services/instructor.service';

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
      is_ins:[false],
      username:['',Validators.required],
      // email : ['',Validators.required],
      password: ['',Validators.required]
    
    })
  }

  ngOnInit(): void {

    const local_user = localStorage.getItem("sparleom-user")
    if(local_user != null){
      const json_local_user = JSON.parse(local_user)
      this.current_user = json_local_user.user_name
    }
  
  
    
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
      const current_user = this.loginForm.value
         
      console.log(current_user)
  

      if(current_user.is_ins){
        localStorage.setItem("who_is_login","instructor")

      }else{
        
        this.regSer.login(current_user.username, current_user.password).subscribe((response: any) => {
      
           
          alert("Welcome,refresh the page once")
          localStorage.setItem("sparleom-user-token",response.token)
      

          this.regSer.getUserDetails(response.token).subscribe((responseuser:any)=>{
           

            console.log(responseuser.user.id)
            const currentUser = {
              "username":responseuser.user.username,
              "id":responseuser.user.id,
              "email":responseuser.user.email

            }
            localStorage.setItem("current-user",JSON.stringify(currentUser))
            localStorage.setItem("who_is_login","user")
          })
         
        
          this.router.navigate([''])
       
      },(error)=>{
          alert("Incorrect Crediancials, try registering")
      });
    
      }


      
    }

  }

  
}
