import { Component, OnInit } from '@angular/core';
import { StudentService } from '../services/student.service';
import { LecturesService } from '../services/lectures.service';
import { Observable, elementAt, forkJoin, map } from 'rxjs';

@Component({
  selector: 'app-student-dashboard',
  templateUrl: './student-dashboard.component.html',
  styleUrls: ['./student-dashboard.component.css']
})
export class StudentDashboardComponent implements OnInit{

  constructor(private stu_ser:StudentService,private lec_ser:LecturesService){

  }

  lecture_list:any[] = []

  option_courses:any[] = []
  JWTtoken:any = localStorage.getItem("masaischoolclone");
    

  ngOnInit(): void {
    
    const student_data = localStorage.getItem("current_user_id")
 
  
    if(student_data != null && this.JWTtoken != null){
      
      this.getStudentByUserId(parseInt(student_data),this.JWTtoken);

      
    }
  }
  getStudentByUserId(id:number,token:string){
    this.stu_ser.fetchStuentByUserId(id,token).subscribe((response:any)=>{
      // console.log(response)

      let courseIds:number = response.body.id;
    
      // this.getCoursesOfStudent(courseIds,token);

      this.getCoursesOfStudent(courseIds, token).subscribe((courses: number[]) => {
     

        courses.forEach(element => {
          

        
          this.getLectureOfCourse(element,this.JWTtoken)
  
        });
      });
  
     

    })
  }

  getCoursesOfStudent(id:number,token:string):Observable<number[]>{

    return this.stu_ser.getCoursesOfStudent(id, token).pipe(
      map((response: any) => {
        let courses: number[] = [];
        if (response.body.length > 0) {
          response.body.forEach((element: any) => {
            this.option_courses.push({"value":element.id,"text":element.courseName})
            courses.push(element.id);
          });
        }
        return courses;
      })
    );
  
  }

  onCourseSelected(event:any){
    this.lecture_list = []
    const selected_course = event.target.value;
   
    this.getLectureOfCourse(selected_course,this.JWTtoken)
    
  }

  getLectureOfCourse(course_id:number,token:string){

    this.lec_ser.getLectureOfCourse(course_id,token).subscribe((lec:any)=>{
            
      // console.log(lec)
  

      lec.forEach((element:any) => {
        // console.log(element)
        this.lecture_list.push(element)
      });
     
    
    })
  }

  
  convertDate(timing_value:any):string{

    const lectureTiming = new Date(timing_value); // Replace this with your actual date value
      let formattedTiming = lectureTiming.toISOString(); // "yyyy-MM-ddThh:mm:ss.SSSZ"

      // Remove seconds and milliseconds
      formattedTiming = formattedTiming.slice(11, 16); // "yyyy-MM-ddThh:mm"
      return formattedTiming;
  }
  



}
