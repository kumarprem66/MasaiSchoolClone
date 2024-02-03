import { Component, OnInit } from '@angular/core';
import { CourseService } from '../services/course.service';
import { LecturesService } from '../services/lectures.service';
import { Router } from '@angular/router';
import { InstructorService } from '../services/instructor.service';
import { TokendataService } from '../services/tokendata.service';
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

  jwtToken: any= localStorage.getItem("masaischoolclone")

  constructor(private cour_ser:CourseService,private lec_ser:LecturesService,
    private insSer:InstructorService,private router:Router, private tokenSer:TokendataService
    ){

  

  }

  onSelectChange(event:any){
    
    this.selectedValue = event.target.value
    
    this.getLectureOfCourse(Number(this.selectedValue),this.jwtToken)
  }


  ngOnInit(): void {
    
 
    const current_user_id = localStorage.getItem("current_user_id")
  

    if(this.jwtToken != null && current_user_id != null){
      const decodedToken = this.tokenSer.getUserDetailsFromToken(this.jwtToken);
      if(decodedToken.authorities == "ROLE_INSTRUCTOR"){

        this.insSer.getInstructorByUserId(parseInt(current_user_id),this.jwtToken).subscribe((response : any)=>{

          this.is_instructor = true;
          
          this.selected_instructor = response.id;
          this.option_instruc.push({value:response.id,text:response.name})
          this.getCourses()
        },error=>{
          alert("User id does not exist...")
        })
       
      }else if(decodedToken.authorities == "ROLE_ADMIN"){

       
        this.getInstructors(this.jwtToken)
        this.getCourses()
      }else{
        alert("Only instructor or admin can view this page")
        this.router.navigate(['/login'])
      }
     
      
     
  
    }
   
    


  }

  getAllLectures(token:string){
    this.lec_ser.getAllLectures(token).subscribe((response)=>{
      this.letures_data = response
    })
  }

  getCourses(){

    if(this.is_instructor){
    
 

      this.getCourseByinstructor(this.selected_instructor)
  
    }else{

      this.cour_ser.getcourses().subscribe((response:any)=>{
        const courses = response
        // console.log(courses)
        courses.forEach((element :any) => {
          
          this.option_courses.push({value:element.id,text:element.courseName})
        });
      
      })
  
    }


    
   
    
  }

  getInstructors(token:string){
    this.insSer.getAllInstructor(token).subscribe((response)=>{
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
      this.getAllLecturesOfInstructor(this.selected_instructor,this.selected_course,this.jwtToken)
    }else{
      
      this.getLectureOfCourse(this.selected_course,this.jwtToken)
    }
   
  }

  onInstructorSelected(event:any){
    this.letures_data = []
    this.selected_instructor = event.target.value;
   
    if(this.selected_course != 0 && this.selected_instructor != 0){
      this.getAllLecturesOfInstructor(this.selected_instructor,this.selected_course,this.jwtToken)
      
    }else{
      
      this.getAllLecturesOfInstructorOnly(this.selected_instructor,this.jwtToken)
    }
   
  }

  getCourseByinstructor(id:number){

    this.cour_ser.getInstructorCourses(id).subscribe((response:any)=>{
     
      const intrcu_name = response
      // console.log(response)


      intrcu_name.forEach((element:any) => {

        
        this.option_courses.push({value:element.id,text:element.courseName})


      });
    })
  }

  getLectureOfCourse(c_id:number,token:string){



    this.lec_ser.getLectureOfCourse(c_id,token).subscribe((response:any)=>{

      // console.log(response)
      this.letures_data = response


      
    })
  }

  getAllLecturesOfInstructor(instrcutorId:number,courseId:number,token:string){
    this.letures_data = []
    this.lec_ser.getInstructorLectures(instrcutorId,courseId,token).subscribe((response:any)=>{
      this.letures_data = response
    
     
    })
  }

  getAllLecturesOfInstructorOnly(instrcutorId:number,token:string){
    this.letures_data = []
    this.lec_ser.getInstructorLecturesOnly(instrcutorId,token).subscribe((response:any)=>{
      this.letures_data = response
      // console.log(response);
     
    })
  }

  updateLecture(id:number){

    const dataToPass = {
     
      "lect_id":id

    }
    this.router.navigate(['admin-create-lecture'],{queryParams:dataToPass})
  }

  deleteLecture(id:number){

    this.lec_ser.deleteLecture(id,this.jwtToken).subscribe((response)=>{
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
