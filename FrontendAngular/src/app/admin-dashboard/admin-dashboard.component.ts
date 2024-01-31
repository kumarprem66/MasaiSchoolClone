import { Component, OnInit } from '@angular/core';
import { CourseService } from '../services/course.service';
import { LecturesService } from '../services/lectures.service';
import { Router } from '@angular/router';
import { InstructorService } from '../services/instructor.service';
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
  option_instruc:any[] =[]

  is_instructor:boolean = false

  instructor_id:number = 0

  selected_course:number = 0;
  selected_instructor:number = 0

  jwttoken : string = "";

  constructor(private cour_ser:CourseService,private lec_ser:LecturesService,private insSer:InstructorService,private router:Router
    ){

      console.log("called")

  }

  onSelectChange(event:any){
    
    this.selectedValue = event.target.value
    
    this.getLectureOfCourse(Number(this.selectedValue),this.jwttoken)
  }


  ngOnInit(): void {
    
 

    const ins = localStorage.getItem("masaischoolclone")
    // if(ins=="instructor"){
    //   this.is_instructor = true
    // }else{
    //   this.getCourses()
    // }

    // const  localIns = localStorage.getItem("instructor_data")
    // if(localIns != null){

    //   const parseIns = JSON.parse(localIns)
    //   this.instructor_id = parseIns.id
    // }
    

    // if(this.instructor_id != 0 && this.instructor_id != undefined){

    //   this.getCourseByinstructor(this.instructor_id)
    //   this.getAllLecturesOfInstructor(this.instructor_id)
      
    // }

    this.getInstructors()
    this.getCourses()
    this.getAllLectures()

    


  }

  getAllLectures(){
    this.lec_ser.getAllLectures().subscribe((response)=>{
      this.letures_data = response
    })
  }

  getCourses(){

    // if(this.is_instructor){
    

    //   this.getCourseByinstructor(1)
  
    // }else{

      this.cour_ser.getcourses().subscribe((response:any)=>{
        const courses = response
        // console.log(courses)
        courses.forEach((element :any) => {
          this.option_courses.push({value:element.id,text:element.courseName})
        });
      
      })
  
    // }


    
   
    
  }

  getInstructors(){
    this.insSer.getAllInstructor().subscribe((response)=>{
      const instruc = response
        // console.log(courses)
        instruc.forEach((element :any) => {
          this.option_instruc.push({value:element.id,text:element.name})
        });
    })
  }
  onCourseSelected(event:any){
    this.letures_data = []
    this.selected_course = event.target.value;
    if(this.selected_instructor != 0 && this.selected_course !=0 ){
      this.getAllLecturesOfInstructor(this.selected_instructor,this.selected_course)
    }else{
      this.getLectureOfCourse(this.selected_course,this.jwttoken)
    }
   
  }

  onInstructorSelected(event:any){
    this.letures_data = []
    this.selected_instructor = event.target.value;
    if(this.selected_course != 0 && this.selected_instructor != 0){
      this.getAllLecturesOfInstructor(this.selected_instructor,this.selected_course)
    }else{
      this.getAllLecturesOfInstructorOnly(this.selected_instructor)
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

  getLectureOfCourse(c_id:number,token:string){



    this.lec_ser.getLectureOfCourse(c_id,token).subscribe((response:any)=>{

      this.letures_data = response


      
    })
  }

  getAllLecturesOfInstructor(instrcutorId:number,courseId:number){
    this.letures_data = []
    this.lec_ser.getInstructorLectures(instrcutorId,courseId).subscribe((response:any)=>{
      this.letures_data = response
     
    })
  }

  getAllLecturesOfInstructorOnly(instrcutorId:number){
    this.letures_data = []
    this.lec_ser.getInstructorLecturesOnly(instrcutorId).subscribe((response:any)=>{
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
