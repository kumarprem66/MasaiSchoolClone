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

  ngOnInit(): void {
    
    const student_data = localStorage.getItem("current_user_id")
    const JWTtoken = localStorage.getItem("masaischoolclone");
    
  
    if(student_data != null && JWTtoken != null){
      
      this.getStudentByUserId(parseInt(student_data),JWTtoken);

      
    }
  }
  getStudentByUserId(id:number,token:string){
    this.stu_ser.fetchStuentByUserId(id,token).subscribe((response:any)=>{
      // console.log(response)

      let courseIds:number = response.body.id;
    
      // this.getCoursesOfStudent(courseIds,token);

      this.getCoursesOfStudent(courseIds, token).subscribe((courses: number[]) => {
     

        courses.forEach(element => {
          
        
          this.lec_ser.getLectureOfCourse(element,token).subscribe((lec:any)=>{
            
        
  
            lec.body.forEach((element:any) => {
              // console.log(element)
              this.lecture_list.push(element)
            });
           
          
          })
  
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
            
            courses.push(element.id);
          });
        }
        return courses;
      })
    );
  
  }

  // getStudentByStudentId(id:number,token:string){
  //   this.stu_ser.getSingleStudent(id,token).subscribe((response:any)=>{
  //     console.log(response)


  //     let courseIds:number[] = response.course_ids;

  //     courseIds.forEach(element => {
        
  //       console.log(element)
  //       this.lec_ser.getLectureOfCourse(element).subscribe((lec:any)=>{
          
  //         console.log(lec)

  //         lec.forEach((element:any) => {
  //           this.lecture_list.push(element)
  //         });
         
        
  //       })

  //     });

     

  //   })
  // }

  // getSingleSingle2(id: number): void {
  //   this.stu_ser.getSingleStudent(id).subscribe((response: any) => {
  //     const courseIds: number[] = response.course_ids;
      
  //     // Create an array of observables for fetching lectures
  //     const lectureObservables = courseIds.map((element: number) => {
  //       return this.lec_ser.getLectureOfCourse(element);
  //     });
  
  //     // Use forkJoin to wait for all lectureObservables to complete
  //     forkJoin(lectureObservables).subscribe((lectureData: any[]) => {
  //       // Process the data
  //       lectureData.forEach((lectures: any[]) => {
  //         this.lecture_list = this.lecture_list.concat(lectures);
  //       });
  
  //       // Now, lecture_list has been updated with all lecture data
  //       console.log(this.lecture_list.length);

  //       this.lecture_list.forEach(ele=>{
  //         console.log(ele)
  //       })
  //     });
  //   });
  // }
  
  
  
  
  convertDate(timing_value:any):string{

    const lectureTiming = new Date(timing_value); // Replace this with your actual date value
      let formattedTiming = lectureTiming.toISOString(); // "yyyy-MM-ddThh:mm:ss.SSSZ"

      // Remove seconds and milliseconds
      formattedTiming = formattedTiming.slice(11, 16); // "yyyy-MM-ddThh:mm"
      return formattedTiming;
  }
  



}
