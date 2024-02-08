import { Component, OnInit } from '@angular/core';
import { CourseService } from '../services/course.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AssignmentService } from '../services/assignment.service';
import { CommonService } from '../common.service';
import { LecturesService } from '../services/lectures.service';
import { TokendataService } from '../services/tokendata.service';
import { InstructorService } from '../services/instructor.service';
import { Router } from '@angular/router';
// import { forkJoin } from 'rxjs/internal/observable/forkJoin';
import { forkJoin, Observable } from 'rxjs';

@Component({
  selector: 'app-instructor-assignment',
  templateUrl: './instructor-assignment.component.html',
  styleUrls: ['./instructor-assignment.component.css']
})
export class InstructorAssignmentComponent implements OnInit{


  course_options:any[] = []
  lecture_options:any[] = []

  all_assignment:any[] = []
  assignmentForm:FormGroup
  instructor_id:number = 0
  is_instructor:boolean = false;
  selected_course: number = 0;
  selected_lecture: number = 0;
  
  jwtToken: any= localStorage.getItem("masaischoolclone")
  current_user_id: any = 0;

  constructor(private course_service:CourseService,private fb:FormBuilder,private lecService:LecturesService,
    private assign_service:AssignmentService,private common:CommonService,private tokenSer:TokendataService,
    private insSer:InstructorService,private router:Router){

    this.assignmentForm = this.fb.group({
      title:['',Validators.required],
      description:['',Validators.required],
      instruction:['',Validators.required],
      start_date:[null,Validators.required],
      due_date:[null,Validators.required],

      course:[null,Validators.required],
      lecture:[null,Validators.required],
    })
  }
  ngOnInit(): void {

    this.current_user_id = localStorage.getItem("current_user_id")
  

    if(this.jwtToken != null && this.current_user_id != null){
      const decodedToken = this.tokenSer.getUserDetailsFromToken(this.jwtToken);
      if(decodedToken.authorities == "ROLE_INSTRUCTOR"){

        this.insSer.getInstructorByUserId(parseInt(this.current_user_id),this.jwtToken).subscribe((response : any)=>{

          this.is_instructor = true;
          
          this.instructor_id = response.id;
          this.getCourseByinstructor(this.instructor_id,this.jwtToken);
          
         
        
        },error=>{
          alert("User id does not exist...")
        })
       
      }else if(decodedToken.authorities == "ROLE_ADMIN"){

        
    
      }else{
        alert("Only instructor or admin can view this page")
        this.router.navigate(['/login'])
      }
     
      
     
  
    }

   
   

  

  }

  getCourseByinstructor(id:number,token:string){
    this.course_service.getInstructorCourses(id).subscribe((response:any)=>{
     
      const intrcu_name = response
      // console.log(intrcu_name)
      intrcu_name.forEach((element:any) => {
        
        this.course_options.push({value:element.id,text:element.courseName})

        this.getInstructorLecture(this.instructor_id,element.id,token)

      });
    })
  }

  createAssignment(){

    if(this.assignmentForm.valid){

      const current_assign = this.assignmentForm.value

      const assignmentObj = {

        
          "title": current_assign.title,
          "description": current_assign.description,

          "instruction": current_assign.instruction,

          "startDate": current_assign.start_date,
          "dueDate": current_assign.due_date
        
      }
     
 
     
      this.assign_service.createAssignment(this.current_user_id,assignmentObj,current_assign.course,current_assign.lecture,this.jwtToken).subscribe((response)=>{
        // console.log(response)
        alert("Created")
      },error =>{
        console.log(error)
      })
     
    }else{

      alert("Make sure every field has valid data")
    }

  

  }

  // getAllAssignemnt(){
  //   this.assign_service.getAllAssignment().subscribe((response:any)=>{
  //     console.log(response)

  //     this.all_assignment = response.results
    
  //   })
  // }


  convertDate(timing_value:any):string{

    const lectureTiming = new Date(timing_value); // Replace this with your actual date value
      let formattedTiming = lectureTiming.toISOString(); // "yyyy-MM-ddThh:mm:ss.SSSZ"

      // Remove seconds and milliseconds
      formattedTiming = formattedTiming.slice(0, 16); // "yyyy-MM-ddThh:mm"
      return formattedTiming;
  }


  getAllAssignmentOfStudent(userId:number,token:string){

    this.common.getALLAssignmentOfStudent(userId,token).subscribe(response => {
       response.forEach(ele=>{
        this.all_assignment.push(ele)
      });
      console.log(this.all_assignment);
    })

   


  }

  getInstructorLecture(instrcutorId:number,courseId:number,token:string){
    this.lecService.getInstructorLectures(instrcutorId,courseId,token).subscribe((response:any)=>{

      
      response.forEach((ele :any )=>{

        this.lecture_options.push({value:ele.id,text:ele.topicTitle})

        
      })
    })
  }

  getAllAssignmentOfLecture(lectureId:number,token:string){

    // console.log(lectureId)
    
    this.lecService.getAssignmentLecture(lectureId,token).subscribe((response:any)=>{

      // console.log(response)

      response.forEach((element:any) => {
       
        this.all_assignment.push(element)
      });;
      
    })
    
  }

  getAllAssignment(userId:number,courseId:number,lectureId:number,token:string){

    
    this.all_assignment = []
    this.assign_service.getAllAssignmentCAL(userId,courseId,lectureId,token).subscribe((response:any)=>{

      // console.log(response)

      response.forEach((element:any) => {
       
        this.all_assignment.push(element)
      });;
      
    })
    
  }




  getAllAssignmentOfCourse(userId:number,id:number,token:string){
    this.all_assignment = []
    this.assign_service.getAllAssignment(userId,id,token).subscribe((response:any)=>{
      this.all_assignment = response;
    })
  }
  

  selectedCourse(event:any){
    this.selected_course = event.target.value;
    
    if((this.selected_course != 0 && this.selected_course != undefined) && (this.selected_lecture != 0 && this.selected_lecture != undefined) ){

      this.getAllAssignment(this.current_user_id,this.selected_course,this.selected_lecture,this.jwtToken)
    }else if((this.selected_course != 0 && this.selected_course != undefined)){
      this.getAllAssignmentOfCourse(this.current_user_id,this.selected_course,this.jwtToken)
    }
   

  }


  selectedLecture(event:any){
    this.selected_lecture = event.target.value;
    if((this.selected_course != 0 && this.selected_course != undefined) && (this.selected_lecture != 0 && this.selected_lecture != undefined) ){

      this.getAllAssignment(this.current_user_id,this.selected_course,this.selected_lecture,this.jwtToken)
    }else if((this.selected_lecture != 0 && this.selected_course != undefined)){
      this.getAllAssignmentOfLecture(this.selected_lecture,this.jwtToken);
    }
   

  }





  
  



}
