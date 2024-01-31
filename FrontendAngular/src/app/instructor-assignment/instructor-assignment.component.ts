import { Component, OnInit } from '@angular/core';
import { CourseService } from '../services/course.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AssignmentService } from '../services/assignment.service';
import { CommonService } from '../common.service';

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
  is_instructor:boolean = false;

  constructor(private course_service:CourseService,private fb:FormBuilder,
    private assign_service:AssignmentService,private common:CommonService){

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


    const  token = localStorage.getItem("masaischoolclone")
    const userId = localStorage.getItem("current_user_id")
    if(token != null && userId != null){

     this.getAllAssignmentOfStudent(parseInt(userId),token)
      
    //  this.assign_service.getAllAssignment(2,token).subscribe((response:any)=>{
            
        
  
    //   // response.body.forEach((element:any) => {
    //   //   console.log(element)
    //   //   this.assignList.push(element)
    //   // });

    //   console.log(response);
     
    
    // })
    }

   
   

  

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
      this.assign_service.createAssignment(current_assign,3,4).subscribe((response)=>{
        console.log(response)
        alert("Created")
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

}
