import { Component, OnInit } from '@angular/core';
import { CourseService } from '../services/course.service';
import { CategoryService } from '../services/category.service';
import { InstructorService } from '../services/instructor.service';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-courses-all',
  templateUrl: './courses-all.component.html',
  styleUrls: ['./courses-all.component.css','./courseAll.scss']
})
export class CoursesAllComponent implements OnInit{


  main_heading = "The World's largest selection of courses"
  second_heading = "Choose from 130,000 online video courses with new additions published every month"

  all_courses:any[] = []

  is_category_click:number = 0

  categories:any[] = []

  selected_category:number = 1
  selected_instructor:number = 1

  instructors:any[] = []

  constructor(private course_ser:CourseService,private router:Router,
    private route:ActivatedRoute,private http:HttpClient,private catService:CategoryService,private instructorSer:InstructorService){

  }

  isAdmin:boolean = false;

  ngOnInit(): void {
    
    // const current_user = localStorage.getItem('masaischoolclone')
    // if(current_user != null){

    //   if(current_user.startsWith('admin')){
    //     this.isAdmin = true
    //   }

    // }

    const who_is_login = localStorage.getItem('who_is_login');

    if(who_is_login != null){

      if(who_is_login=='admin'){
        this.isAdmin = true
      }

    }


    this.route.queryParams.subscribe((param:any)=>{

      this.is_category_click = param.cat_id
      // this.selected_category = param.cat_id
      // console.log(this.is_category_click)
    })

    if(this.is_category_click != 0 && this.is_category_click != undefined){

      this.course_ser.getCategoriesCourses(this.is_category_click).subscribe((response)=>{

        
        this.all_courses = response
        
        // console.log(response)
      })
    }else{


      this.getAllCategories()
      this.getAllInstructor()
    this.getAllCourses()



    }


  }

  getCourseByInstructor(event:any){

    this.selected_instructor = event.target.value;
    this.getInstructorCourse(Number(this.selected_instructor))
    // this.getCourseByinsAndCat(this.selected_instructor,this.selected_category)
    // console.log(event)
  }


  getAllCategories(){
    this.catService.getCategories().subscribe((response:any)=>{
      // console.log(response)

      this.categories = response;
    })
  }

  onCategoryChange(event:any){

    this.selected_category = event.target.value;
  
    this.getCategoryCourse(Number(this.selected_category))
    // this.getCourseByinsAndCat(this.selected_instructor,this.selected_category)
  
  }

  getAllCourses(){

   
  
      this.course_ser.getcourses().subscribe((response:any)=>{
        console.log(response)
  
        this.all_courses = response
        // console.log(response)
      })



   
  }

  show_course_details(id:number){

    const datatopass = {
      "course_id":id
    }

    this.router.navigate(['course-detail'],{queryParams:datatopass})
    
  }

  edit_course(id:number){

    // console.log(id)
    this.course_ser.getCourseById(id).subscribe((resolve)=>{

      const datatopass  = {

        "course_id":id
      }
      this.router.navigate(['admin-add-course'],{queryParams:datatopass})
      
    })

  
  }

  delete_course(id:number){

    const aggreed_delete = confirm("are you sure to delete?")
    if(aggreed_delete){
      this.course_ser.deleteCourse(id).subscribe((response)=>{
        // console.log(response)
        alert("deleted Successfully")
        this.getAllCourses()
      })
    }

  }


  details_course(id:number){

    this.show_course_details(id)

  }
  buy_course(id:number){
 
    const local_user = localStorage.getItem("can_purchase")

    const datatopass = {

      "course_id":id

    }


    if(local_user != null){

    
        this.router.navigate(['/payment'],{queryParams:datatopass})
      
 
    }else{

       
        
        this.router.navigate(['/student-register'],{queryParams:datatopass})
       
      }
    
    
  }

  getAllInstructor(){
    this.instructorSer.getAllInstructor().subscribe((response)=>{

      this.instructors = response;
      // console.log(response)
    })
  }


  getCategoryCourse(cat_id:number){

    this.course_ser.getCategoriesCourses(cat_id).subscribe((response:any)=>{

      // this.all_courses_instructor = response;
      // this.all_courses_instructor = this.all_courses_instructor.filter((cou)=>{
      //   return cou.id != this.current_course_id
      // })
      // console.log(response)
      // alert(response)
      this.all_courses = response;

      // console.log(response);

      
    })

  }

  getInstructorCourse(ins_id:number){
    this.course_ser.getInstructorCourses(ins_id).subscribe((response:any)=>{
      this.all_courses = response;
    })
  }

  // getCourseByinsAndCat(ins_id:number,cat_id:number){
  //   this.course_ser.getCourseByCategoryAndInstructor(cat_id,ins_id).subscribe((response:any)=>{
  //     this.all_courses = response;
  //   })
  // }

  add_to_cart(course_id: number) {
    
  }
}
