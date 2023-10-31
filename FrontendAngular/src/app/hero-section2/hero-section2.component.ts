import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CourseService } from '../services/course.service';

@Component({
  selector: 'app-hero-section2',
  templateUrl: './hero-section2.component.html',
  styleUrls: ['./hero-section2.component.css','./slide.scss']
})
export class HeroSection2Component implements OnInit{

  main_heading = "The World's largest selection of courses"
  second_heading = "Choose from 130,000 online video courses with new additions published every month"

  all_courses:any[] = []
  constructor(private course_ser:CourseService,private router:Router){

  }

  ngOnInit(): void {
    
    this.getAllCourses()

  }


  getAllCourses(){
    this.course_ser.getcourses().subscribe((response:any)=>{
      console.log(response)

      this.all_courses = response.results
    })
  }

  show_course_details(id:number){

    const datatopass = {
      "course_id":id
    }

    this.router.navigate(['course-detail'],{queryParams:datatopass})
    
  }

  details_course(id:number){

    this.show_course_details(id)

  }
  buy_course(id:number){
    // later

    alert("working")

  }


}
