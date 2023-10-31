import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LecturesService } from '../services/lectures.service';
import { BsDatepickerConfig } from 'ngx-bootstrap/datepicker';
import { ActivatedRoute, Router } from '@angular/router';
import { CourseService } from '../services/course.service';
import { HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-admin-create-lecture',
  templateUrl: './admin-create-lecture.component.html',
  styleUrls: ['./admin-create-lecture.component.css']
})
export class AdminCreateLectureComponent implements OnInit{

  lectureData:FormGroup;

  // hiding leacture create form
  is_instructor = false
  is_student = true

  instructor_id:number =0



  course_list:string[] = []
  // Ensure you have this property
    
  isupdate:number = 0;
  options:any[] = [];
  lecture_list:any[] = []


  constructor(private fb:FormBuilder,private lecSer:LecturesService,
    private router:Router,private coursesService:CourseService
    ,private route:ActivatedRoute){
  
    
    this.lectureData = this.fb.group({

      lecture_course_name:['',Validators.required],
      topic_title:['',Validators.required],
      timing: [null,Validators.required],
      meeting_url: ['',Validators.required]
    })



   
  }

  ngOnInit(): void {


    const ins = localStorage.getItem("who_is_login")
    if(ins=="instructor"){
      this.is_instructor = true
    }

    const  localIns = localStorage.getItem("instructor_data")
    if(localIns != null){

      const parseIns = JSON.parse(localIns)
      this.instructor_id = parseIns.id
     
    }
    
    if(this.instructor_id != 0 && this.instructor_id != undefined){
      this.getInstructorLecture(this.instructor_id)
    }else{
      this.getAllLectures()
    }
   
    this.getcourses()

    

      
    
    this.route.queryParams.subscribe((param:any)=>{

      // console.log(param.lect_id)
      this.isupdate = param.lect_id
      
      if(param.lect_id != undefined){
          this.getLectureFromId(param.lect_id)
      }

      
    })

  }
  lectureSubmit(){

    if(this.lectureData.valid){
      const lecturevalue  = this.lectureData.value

      if(this.isupdate == 0 || this.isupdate == undefined){
        this.lecSer.createLecture(lecturevalue).subscribe((response)=>{
          // console.log(response)
          
         
    
            alert("Lecture created")
        })
       
      }else{

        // lecturevalue.timing = lecturevalue.timing+':00Z';
        this.lecSer.updateLecture(this.isupdate,lecturevalue).subscribe((response)=>{
          // console.log(response)
          alert("Lecture Updated")
           
        })

      
        // console.log(lecturevalue)
        // console.log(this.isupdate)
      }

      this.router.navigate(['admin-dashboard'])
      

    }else{
      alert("provide all field except file")
    }

  }

  getLectureFromId(id:number){
    this.lecSer.getLectureById(id).subscribe((response:any)=>{


      this.lectureData.patchValue(response)
      this.lectureData.patchValue({
        timing: this.convertDate(response.timing),
      }); 

      // console.log(response)



    })
  }

  getAllLectures(){
    this.lecSer.getAllLectures().subscribe((response:any)=>{
      this.lecture_list = response.results;
      // console.log(response.results)
    })
  }

   getcourses(){
     this.coursesService.getcourses().subscribe((response:any)=>{
      console.log(response)

       const cList = response.results;
      cList.forEach((element : any) => {
        
       
        this.options.push(

          {value:element.id,text:element.course_name},
             
          )
      });
    })
  }

 
  convertDate(timing_value:any):string{

    const lectureTiming = new Date(timing_value); // Replace this with your actual date value
      let formattedTiming = lectureTiming.toISOString(); // "yyyy-MM-ddThh:mm:ss.SSSZ"

      // Remove seconds and milliseconds
      formattedTiming = formattedTiming.slice(0, 16); // "yyyy-MM-ddThh:mm"
      return formattedTiming;
  }


  deleteLecture(id:number){
    const is_agreed = confirm("Are you sure want to delete this lecture")
   
    if(is_agreed){
      this.lecSer.deleteLecture(id).subscribe((response)=>{
        alert("Lecture deleted");
        this.getAllLectures()
      })
    }
  }


  getInstructorLecture(id:number){
    this.lecSer.getInstructorLectures(id).subscribe((response:any)=>{

      this.lecture_list = response
    })
  }
}
