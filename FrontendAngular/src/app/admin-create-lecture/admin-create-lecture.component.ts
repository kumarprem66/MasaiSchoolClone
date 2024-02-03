import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LecturesService } from '../services/lectures.service';
import { BsDatepickerConfig } from 'ngx-bootstrap/datepicker';
import { ActivatedRoute, Router } from '@angular/router';
import { CourseService } from '../services/course.service';
import { HttpHeaders } from '@angular/common/http';
import { InstructorService } from '../services/instructor.service';
import { TokendataService } from '../services/tokendata.service';

@Component({
  selector: 'app-admin-create-lecture',
  templateUrl: './admin-create-lecture.component.html',
  styleUrls: ['./admin-create-lecture.component.css']
})
export class AdminCreateLectureComponent implements OnInit{

  lectureData:FormGroup;



  course_list:string[] = []
  // Ensure you have this property
    
  isupdate:number = 0;
  options:any[] = [];
  lecture_list:any[] = []
  course_options:any[] = []
  instructor_options:any[] = []
  selected_course_id:number = 0
  instrcutorId:number = 0;
  is_instructor:boolean = false
  
  selected_instructor:number = 0

  jwtToken: any= localStorage.getItem("masaischoolclone")

  constructor(private fb:FormBuilder,private lecSer:LecturesService,
    private router:Router,private coursesService:CourseService,
    private instrucSer:InstructorService,private tokenSer:TokendataService
    ,private route:ActivatedRoute){
  
    
    this.lectureData = this.fb.group({

      course:['',Validators.required],
      instructor:['',Validators.required],
      topicTitle:['',Validators.required],
      timing: [null,Validators.required],
      meetingUrl: ['',Validators.required]
    })



   
  }

  ngOnInit(): void {


  
    this.route.queryParams.subscribe((param:any)=>{

      this.isupdate = param.lect_id
      
      if(param.lect_id != undefined){
          this.getLectureFromId(param.lect_id,this.jwtToken)
      }

      
    })


    const current_user_id = localStorage.getItem("current_user_id")
  

    if(this.jwtToken != null && current_user_id != null){
      const decodedToken = this.tokenSer.getUserDetailsFromToken(this.jwtToken);
      if(decodedToken.authorities == "ROLE_INSTRUCTOR"){

        this.instrucSer.getInstructorByUserId(parseInt(current_user_id),this.jwtToken).subscribe((response : any)=>{

          this.is_instructor = true;
          
          this.selected_instructor = response.id;
          this.instructor_options.push({value:response.id,text:response.name})
          this.getcourses()
        
        },error=>{
          alert("User id does not exist...")
        })
       
      }else if(decodedToken.authorities == "ROLE_ADMIN"){

        this.getInstructors(this.jwtToken)
        this.getcourses();
        this.getAllLectures(this.jwtToken);

    
      }else{
        alert("Only instructor or admin can view this page")
        this.router.navigate(['/login'])
      }
     
      
     
  
    }

  }
  lectureSubmit(){

    if(this.lectureData.valid){
      const lecturevalue  = this.lectureData.value

      if(this.isupdate == 0 || this.isupdate == undefined){
        this.lecSer.createLecture(lecturevalue,this.selected_course_id,this.instrcutorId,this.jwtToken)
        .subscribe((response)=>{
          console.log(response)
    
            alert("Lecture created")
            this.getAllLectures(this.jwtToken);
             
        },(error)=>{
          alert(error)
        })
       
      }else{

        // lecturevalue.timing = lecturevalue.timing+':00Z';
        this.lecSer.updateLecture(this.isupdate,lecturevalue,this.jwtToken).subscribe((response)=>{
          // console.log(response)
          alert("Lecture Updated")
          
          this.getAllLectures(this.jwtToken);

          this.router.navigate(['/admin-dashboard']);
           
        })


      }


    }else{
      alert("provide all field except file")
    }

  }
  getInstructors(token:string){
    this.instrucSer.getAllInstructor(token).subscribe((response)=>{
      const instruc = response
        // console.log(courses)
        instruc.forEach((element :any) => {
          this.instructor_options.push({value:element.id,text:element.name})
        });
    })
  }

  getLectureFromId(id:number,token:string){
    this.lecSer.getLectureById(id,token).subscribe((response:any)=>{


      
      this.getCourseFromLecture(id,token);
      this.getInstructorByLecture(id,token);
      this.lectureData.patchValue(response)
      this.lectureData.patchValue({
        timing: this.convertDate(response.timing),
      }); 

      // console.log(response)
    



    })
  }

  getCourseFromLecture(lecture_id:number,token:string){
    this.lecSer.getCourseByLecureId(lecture_id,token).subscribe((response:any)=>{
      this.selected_course_id = response.id;
      this.lectureData.get('course')?.setValue(response.id)
     
    })
  }

  getAllLectures(token:string){
    this.lecSer.getAllLectures(token).subscribe((response:any)=>{
      this.lecture_list = response;
      console.log(response)
    })
  }

   getcourses(){
    if(this.is_instructor){
    

      this.getCourseByinstructor(this.selected_instructor)
  
    }else{

     this.coursesService.getcourses().subscribe((response:any)=>{
      // console.log(response)

       const cList = response;
      cList.forEach((element : any) => {
        
       
        this.course_options.push(

          {value:element.id,text:element.courseName},
             
          )
      });
    })
  }
  }

  selectedCourse(event:any){

    this.selected_course_id = event.target.value;
    this.getcourseInstructor(this.selected_course_id)
  }

  selectedInstructor(event:any){

    this.selected_instructor = event.target.value;
  
    this.getCourseByinstructor(this.selected_instructor)
  }
  getcourseInstructor(course_id:number){
    this.instructor_options = []
    this.coursesService.getCourseInstructor(course_id).subscribe((response:any)=>{
    this.instrcutorId = response.id;
    this.instructor_options.push({value:response.id,text:response.name})

    
   })
 }

 getInstructorByLecture(lectureId:number,token:string){
  this.lecSer.getInstructorByLecture(lectureId,token).subscribe((response:any)=>{

    this.lectureData.get('instructor')?.setValue(response.id)
    // console.log(response)
  })

 }

 
  convertDate(timing_value:any):string{

    const lectureTiming = new Date(timing_value); // Replace this with your actual date value
      let formattedTiming = lectureTiming.toISOString(); // "yyyy-MM-ddThh:mm:ss.SSSZ"

      // Remove seconds and milliseconds
      formattedTiming = formattedTiming.slice(0, 19); // "yyyy-MM-ddThh:mm"
      return formattedTiming;
  }


  deleteLecture(id:number){
    const is_agreed = confirm("Are you sure want to delete this lecture")
   
    if(is_agreed){
      this.lecSer.deleteLecture(id,this.jwtToken).subscribe((response)=>{
        alert("Lecture deleted");
        this.getAllLectures(this.jwtToken)
      })
    }
  }

  getCourseByinstructor(id:number){

    this.course_options = []
    this.coursesService.getInstructorCourses(id).subscribe((response:any)=>{
     
      const intrcu_name = response

      intrcu_name.forEach((element:any) => {

        
        this.course_options.push({value:element.id,text:element.courseName})
        this.getInstructorLecture(this.selected_instructor,element.id,this.jwtToken)


      });
    })
  }
  getInstructorLecture(instrcutorId:number,courseId:number,token:string){
    this.lecSer.getInstructorLectures(instrcutorId,courseId,token).subscribe((response:any)=>{

      this.lecture_list = response
    })
  }
}
