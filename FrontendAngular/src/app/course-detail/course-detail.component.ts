import { Component, OnInit } from '@angular/core';
import { CourseService } from '../services/course.service';
import { ActivatedRoute, Router } from '@angular/router';
import { TokendataService } from '../services/tokendata.service';

@Component({
  selector: 'app-course-detail',
  templateUrl: './course-detail.component.html',
  styleUrls: ['./course-detail.component.css','./course_detail.scss']
})
export class CourseDetailComponent implements OnInit{

  current_course_id = 0
  current_course:any = ''
  instructor_name:string = ''
  all_courses_instructor:any[] = []
  jwtToken:any = localStorage.getItem("masaischoolclone");
  constructor(private cour_ser:CourseService,private route:ActivatedRoute,private tokenSer:TokendataService
    ,private router:Router ){

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
      // this.getInstructorCourse(response.Instructor.id)
      this.getCourseIns(id);
      // console.log(this.current_course)
    })
  }

  getCourseIns(id:number){
    this.cour_ser.getCourseInstructor(id).subscribe(((response:any)=>{
      // console.log(response.id)
      this.instructor_name = response.name;
      this.getInstructorCourse(response.id);
    }))

  }

  getInstructorCourse(ins_id:number){

    this.cour_ser.getInstructorCourses(ins_id).subscribe((response:any)=>{

      this.all_courses_instructor = response;
      this.all_courses_instructor = this.all_courses_instructor.filter((cou)=>{
        return cou.id != this.current_course_id
      })
      // console.log(response)
    })

  }

  show_course_details(id:number){

    this.getCourseById(id)
    // const datatopass = {
    //   "course_id":id
    // }

    // this.router.navigate(['course-detail'],{queryParams:datatopass})
    
  }

  buyCourse(id:number){
    console.log(id)
       if(this.jwtToken != null){

      
      const decodedToken = this.tokenSer.getUserDetailsFromToken(this.jwtToken)
      
      if(decodedToken.authorities == "ROLE_USER"){
        let userConfirmed = window.confirm("Please Register as a Student first....");
        // Check the user's choice
        if (userConfirmed) {
          this.router.navigate(['/student-register'])
        }
      }else if(decodedToken.authorities == "ROLE_STUDENT"){
        const course_id_pass = {
          "cid":id
        }
        this.router.navigate(['/payment'],{queryParams:course_id_pass})
      }
     
  
    }else{
      let userConfirmed = window.confirm("Please Login first....");

      // Check the user's choice
      if (userConfirmed) {
        this.router.navigate(['/login'])
      }
    }
  }
}
