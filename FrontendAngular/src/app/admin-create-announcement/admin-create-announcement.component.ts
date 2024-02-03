import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AnnouncementService } from '../services/announcement.service';
import { Router } from '@angular/router';
import { CourseService } from '../services/course.service';
import { DepartmentService } from '../services/department.service';
import { TokendataService } from '../services/tokendata.service';
import { InstructorService } from '../services/instructor.service';

@Component({
  selector: 'app-admin-create-announcement',
  templateUrl: './admin-create-announcement.component.html',
  styleUrls: ['./admin-create-announcement.component.css']
})
export class AdminCreateAnnouncementComponent implements OnInit{

  announceForm:FormGroup
  ann_list:any[] = []
  is_inst_is_stu:boolean = false
  course_options:any[] = []
  depart_options:any[] = []
  department_id:number = 0;
  course_id:number = 0;

  title:string = '';
 
  description:string = '';
  publishDate:Date = new Date()
  course:number = 0;
  department:number = 0
  // token:string = "";
  instructor_id:number = 0;
  is_instructor = false;
  

  tokenJWT:any = localStorage.getItem("masaischoolclone")
  current_user_id = localStorage.getItem("current_user_id")

  constructor(private fb:FormBuilder,private ans:AnnouncementService,
    private courseSer:CourseService,private departSer:DepartmentService,
     private router:Router,private tokenSer:TokendataService,private inSer:InstructorService){
    this.announceForm = this.fb.group({
      title : ['',Validators.required],
      description: ['', Validators.required],
      publishDate:['',Validators.required],
      course : ['',Validators.required],
      department : ['',Validators.required],
    })
  }



  ngOnInit(): void {

    const current_user_id = localStorage.getItem("current_user_id")
  

    if(this.tokenJWT != null && current_user_id != null){
      const decodedToken = this.tokenSer.getUserDetailsFromToken(this.tokenJWT);
      if(decodedToken.authorities == "ROLE_INSTRUCTOR"){

        this.inSer.getInstructorByUserId(parseInt(current_user_id),this.tokenJWT).subscribe((response : any)=>{

          this.is_instructor = true;
          
          this.instructor_id = response.id;
          this.getCourseByinstructor(this.instructor_id,this.tokenJWT);
          
         
        
        },error=>{
          alert("User id does not exist...")
        })
       
      }else if(decodedToken.authorities == "ROLE_ADMIN"){

        this.showAnnounces(this.tokenJWT)
        this.getAllCourses()
        this.getAllDepartment(this.tokenJWT);
        
    
      }else{
        alert("Only instructor or admin can view this page")
        this.router.navigate(['/login'])
      }
     
      
     
  
    }

   
   

  

  }

  getCourseByinstructor(id:number,token:string){
    this.courseSer.getInstructorCourses(id).subscribe((response:any)=>{
     
      const intrcu_name = response
      // console.log(intrcu_name)
      intrcu_name.forEach((element:any) => {
        
        this.course_options.push({value:element.id,text:element.courseName})

       
        this.showAnnouncesByCourse(element.id,token)


      });
    })
  }

  createAnnounce(){
    if(this.announceForm.valid){

      const annData = this.announceForm.value

      this.ans.createAnnounce(annData,this.department_id,this.course_id,this.tokenJWT).subscribe((response)=>{
        alert("Announcement created")
        this.showAnnounces(this.tokenJWT);
        
        
      },error=>{
        console.log(error);
      })
      // console.log(annData)

    }else{
      alert("Something is missing, please give all the details")
    }
  }


  showAnnounces(token:string){
    this.ans.getAnnounces(token).subscribe((response:any)=>{
      
      const responseData = response;
      this.ann_list = responseData
      console.log(responseData)
    })
  }

  showAnnouncesByCourse(course_id:number,token:string){
    this.ans.getAnnouncesByCourse(course_id,token).subscribe((response:any)=>{
      
      const responseData = response;
      this.ann_list = responseData
      console.log(responseData)
    })
  }
  deleteAnnoun(id:number){

    console.log(id)
    const take_confirmation = confirm("Are you sure?")
    if(take_confirmation){

      this.ans.deleteAnnounce(id,this.tokenJWT).subscribe((response)=>{

        alert("deleted")
        this.showAnnounces(this.tokenJWT)
      })
    }
  
  }

  getAllCourses(){

    this.courseSer.getcourses().subscribe((response)=>{
      const courses = response;
      courses.forEach((ele:any) => {
        this.course_options.push({value:ele.id,text:ele.courseName})
      })
    
    })
  }

  getAllCoursesByDepart(department_id:number){

    this.course_options  = []
    this.courseSer.getCourses(department_id).subscribe((response)=>{
      const courses = response;
      courses.forEach((ele:any) => {
        this.course_options.push({value:ele.id,text:ele.courseName})
      })
    
    })
  }

  getAllDepartment(token : string){

    this.departSer.getAllDepartment(token).subscribe((response)=>{
      const departs = response;
      departs.forEach((ele:any) => {
        this.depart_options.push({value:ele.id,text:ele.name})
      })
    
    })
  }

  selectedCourse(event:any){

    this.course_id = event.target.value;
    // console.log(this.course_id);
  }

  selectedDept(event:any){

    this.department_id = event.target.value;
    this.getAllCoursesByDepart(this.department_id);
    // console.log(this.department_id);
  }
}
