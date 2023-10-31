import { Component, OnInit } from '@angular/core';
import { CourseService } from '../services/course.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AssignmentService } from '../services/assignment.service';

@Component({
  selector: 'app-instructor-assignment',
  templateUrl: './instructor-assignment.component.html',
  styleUrls: ['./instructor-assignment.component.css']
})
export class InstructorAssignmentComponent implements OnInit{


  course_options:any[] = []

  all_assignment:any[] = []
  assignmentForm:FormGroup
  instructor_id:number = 0

  constructor(private course_service:CourseService,private fb:FormBuilder,private assign_service:AssignmentService){

    this.assignmentForm = this.fb.group({
      title:['',Validators.required],
      description:['',Validators.required],
      instructon:[''],
      start_date:[null,Validators.required],
      due_date:[null,Validators.required],
      course:[null,Validators.required]
    })
  }
  ngOnInit(): void {


  
    
   

    const  localIns = localStorage.getItem("instructor_data")
    if(localIns != null){

      const parseIns = JSON.parse(localIns)
      this.instructor_id = parseIns.id
      
    }

    if(this.instructor_id != 0 && this.instructor_id != undefined){
      this.getCourseByinstructor(this.instructor_id)
    }

    this.getAllAssignemnt() 

  }

  getCourseByinstructor(id:number){
    this.course_service.getInstructorCourses(id).subscribe((response:any)=>{
     
      const intrcu_name = response
      intrcu_name.forEach((element:any) => {
        
        this.course_options.push({value:element.id,text:element.course_name})


      });
    })
  }

  createAssignment(){

    if(this.assignmentForm.valid){

      const current_assign = this.assignmentForm.value
      console.log(current_assign)
      this.assign_service.createAssignment(current_assign).subscribe((response)=>{
        console.log(response)
        alert("Created")
      })
     
    }else{

      alert("Make sure every field has valid data")
    }

  

  }

  getAllAssignemnt(){
    this.assign_service.getAllAssignment().subscribe((response:any)=>{
      console.log(response)

      this.all_assignment = response.results
      // this.all_assignment.forEach((element)=>{
      //   this.convertDate(element.start_date)
      // })
    })
  }


  convertDate(timing_value:any):string{

    const lectureTiming = new Date(timing_value); // Replace this with your actual date value
      let formattedTiming = lectureTiming.toISOString(); // "yyyy-MM-ddThh:mm:ss.SSSZ"

      // Remove seconds and milliseconds
      formattedTiming = formattedTiming.slice(0, 16); // "yyyy-MM-ddThh:mm"
      return formattedTiming;
  }



}
