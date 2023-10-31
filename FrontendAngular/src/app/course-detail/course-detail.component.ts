import { Component, OnInit } from '@angular/core';
import { CourseService } from '../services/course.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-course-detail',
  templateUrl: './course-detail.component.html',
  styleUrls: ['./course-detail.component.css','./course_detail.scss']
})
export class CourseDetailComponent implements OnInit{

  current_course_id = 0
  current_course:any = ''
  all_courses_instructor:any[] = []
  constructor(private cour_ser:CourseService,private route:ActivatedRoute ){

  }
  ngOnInit(): void {
    

    // this.getCourseById(1)
    // this.getInstructorCourse(1)

    this.route.queryParams.subscribe((param:any)=>{

      this.current_course_id = param.course_id
      
      if(param.course_id != undefined){
          this.getCourseById(param.course_id)
      }
      
    })
   
   
  }

  getCourseById(id:number){

    this.cour_ser.getCourseById(id).subscribe((response:any)=>{
      this.current_course = response;
      this.getInstructorCourse(response.Instructor)
      console.log(this.current_course)
    })
  }

  getInstructorCourse(ins_id:number){

    this.cour_ser.getInstructorCourses(ins_id).subscribe((response:any)=>{

      this.all_courses_instructor = response;
      this.all_courses_instructor = this.all_courses_instructor.filter((cou)=>{
        return cou.id != this.current_course_id
      })
      console.log(response)
    })

  }

  show_course_details(id:number){

    this.getCourseById(id)
    // const datatopass = {
    //   "course_id":id
    // }

    // this.router.navigate(['course-detail'],{queryParams:datatopass})
    
  }
}
