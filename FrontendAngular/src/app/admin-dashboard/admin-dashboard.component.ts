import { Component, OnInit } from '@angular/core';
import { CourseService } from '../services/course.service';
import { LecturesService } from '../services/lectures.service';
import { Router } from '@angular/router';
// import { DatePipe } from '@angular/common';
// import { DatePipe } from '@angular/common';
// import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent implements OnInit{


  option_courses:any[] = []

  letures_data:any[] = []

  selectedValue:number = 0

  is_instructor:boolean = false

  instructor_id:number = 0

  

  constructor(private cour_ser:CourseService,private lec_ser:LecturesService,private router:Router
    ){

      console.log("called")

  }

  onSelectChange(event:any){
    
    this.selectedValue = event.target.value
    
    this.getLectureOfCourse(Number(this.selectedValue))
  }


  ngOnInit(): void {
    
 

    const ins = localStorage.getItem("who_is_login")
    if(ins=="instructor"){
      this.is_instructor = true
    }else{
      this.getCourses()
    }

    const  localIns = localStorage.getItem("instructor_data")
    if(localIns != null){

      const parseIns = JSON.parse(localIns)
      this.instructor_id = parseIns.id
    }
    

    if(this.instructor_id != 0 && this.instructor_id != undefined){

      this.getCourseByinstructor(this.instructor_id)
      this.getAllLecturesOfInstructor(this.instructor_id)
      
    }




  }

  getCourses(){

    if(this.is_instructor){
    

      this.getCourseByinstructor(1)
  
    }else{

      this.cour_ser.getcourses().subscribe((response:any)=>{
        const courses = response.results
        // console.log(courses)
        courses.forEach((element :any) => {
          this.option_courses.push({value:element.id,text:element.course_name})
        });
      
      })
  
    }


    
   
    
  }

  getCourseByinstructor(id:number){

    this.cour_ser.getInstructorCourses(id).subscribe((response:any)=>{
     
      const intrcu_name = response
      console.log(response)


      intrcu_name.forEach((element:any) => {

        
        this.option_courses.push({value:element.id,text:element.course_name})


      });
    })
  }

  getLectureOfCourse(c_id:number){



    this.lec_ser.getLectureOfCourse(c_id).subscribe((response:any)=>{

      this.letures_data = response


      
    })
  }

  getAllLecturesOfInstructor(id:number){
    this.lec_ser.getInstructorLectures(id).subscribe((response:any)=>{
      this.letures_data = response
     
    })
  }

  updateLecture(id:number){

    const dataToPass = {
     
      "lect_id":id

    }
    this.router.navigate(['admin-create-lecture'],{queryParams:dataToPass})
  }

  deleteLecture(id:number){

    this.lec_ser.deleteLecture(id).subscribe((response)=>{
      alert("Deleted")
    })
  }

  convertDate(timing_value:any):string{

    const lectureTiming = new Date(timing_value); 
      let formattedTiming = lectureTiming.toISOString(); // "yyyy-MM-ddThh:mm:ss.SSSZ"

      // Remove seconds and milliseconds
      formattedTiming = formattedTiming.slice(0, 10); // "yyyy-MM-dd"

      return formattedTiming;
  }

  convertDateInTime(timing_value:any):string{
    const lectureTiming = new Date(timing_value); 
    let formattedTiming = lectureTiming.toISOString(); // "yyyy-MM-ddThh:mm:ss.SSSZ"

    formattedTiming = formattedTiming.slice(11, 16); // "hh:mm"

    return formattedTiming;
  }

}
