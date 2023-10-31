import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CourseService } from '../services/course.service';

@Component({
  selector: 'app-best-selling',
  templateUrl: './best-selling.component.html',
  styleUrls: ['./best-selling.component.css','../hero-section2/slide.scss']
})
export class BestSellingComponent {

  main_heading2 = "Students are viewing"


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
