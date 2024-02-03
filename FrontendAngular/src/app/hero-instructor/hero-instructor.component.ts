import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-hero-instructor',
  templateUrl: './hero-instructor.component.html',
  styleUrls: ['./hero-instructor.component.css','../header/headers.scss']
})
export class HeroInstructorComponent {

  constructor(private router:Router){

  }

  bacomeinstructor(){

    const datatopass = {
      "hero_ins":true

    }

    const JWTtoken = localStorage.getItem("masaischoolclone");
    const current_user_id = localStorage.getItem("current_user_id");
    if(JWTtoken != null && current_user_id != null){
      this.router.navigate(['instruc-register'],{queryParams:datatopass})
    }else{
      alert("You have to register as a user first")
    }
 



  }

}
