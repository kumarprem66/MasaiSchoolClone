import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AnnouncementService } from '../services/announcement.service';
import { Router } from '@angular/router';
import { CourseService } from '../services/course.service';
import { DepartmentService } from '../services/department.service';

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

  constructor(private fb:FormBuilder,private ans:AnnouncementService,private courseSer:CourseService,private departSer:DepartmentService, private router:Router){
    this.announceForm = this.fb.group({
      title : ['',Validators.required],
      description: ['', Validators.required],
      publishDate:['',Validators.required],
      course : ['',Validators.required],
      department : ['',Validators.required],
    })
  }

  ngOnInit(): void {

    const is_not_admin = localStorage.getItem("who_is_login")
    if(is_not_admin != "admin"){
      this.is_inst_is_stu = true
    }
    
    this.showAnnounces()
    this.getAllCourses()
    this.getAllDepartment();
  }

  createAnnounce(){
    if(this.announceForm.valid){

      const annData = this.announceForm.value

      this.ans.createAnnounce(annData,this.department_id,this.course_id).subscribe((response)=>{
        alert("Announcement created")
        this.showAnnounces();
        this.router.navigate(['admin-dashboard'])
        console.log(response)
      })
      // console.log(annData)

    }else{
      alert("Something is missing, please give all the details")
    }
  }


  showAnnounces(){
    this.ans.getAnnounces().subscribe((response:any)=>{
      
      const responseData = response;
      // this.ann_list = responseData
      console.log(responseData)
    })
  }

  deleteAnnoun(id:number){

    console.log(id)
    const take_confirmation = confirm("Are you sure?")
    if(take_confirmation){

      this.ans.deleteAnnounce(id).subscribe((response)=>{

        alert("deleted")
        this.showAnnounces()
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

  getAllDepartment(){

    this.departSer.getAllDepartment().subscribe((response)=>{
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
