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

    this.router.navigate(['instruc-register'],{queryParams:datatopass})



  }

}
