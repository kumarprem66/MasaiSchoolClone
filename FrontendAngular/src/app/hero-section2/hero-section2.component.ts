import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CourseService } from '../services/course.service';
import { TokendataService } from '../services/tokendata.service';

@Component({
  selector: 'app-hero-section2',
  templateUrl: './hero-section2.component.html',
  styleUrls: ['./hero-section2.component.css','./slide.scss']
})
export class HeroSection2Component implements OnInit{


  main_heading = "The World's largest selection of courses"
  second_heading = "Choose from 130,000 online video courses with new additions published every month"

  all_courses:any[] = []
  jwtToken:any = localStorage.getItem("masaischoolclone");
  constructor(private course_ser:CourseService,private router:Router,private tokenSer:TokendataService){

  }

  ngOnInit(): void {
    
    this.getAllCourses()

  }


  getAllCourses(){
    this.course_ser.getcourses().subscribe((response:any)=>{
      

      this.all_courses = response
    })
  }

  show_course_details(id:number){

    const datatopass = {
      "course_id":id
    }

    this.router.navigate(['course-detail'],{queryParams:datatopass})
    
  }

  details_course(id:number){

    this.show_course_details(id)

  }
  buy_course(id:number){
    // later

    const datatopass = {

      "course_id":id
    }
    this.router.navigate(['course-detail'],{queryParams : datatopass})
   
    // if(this.jwtToken != null){

      
    //   const decodedToken = this.tokenSer.getUserDetailsFromToken(this.jwtToken)
      
    //   if(decodedToken.authorities == "ROLE_USER"){
    //     let userConfirmed = window.confirm("Please Register as a Student first....");
    //     // Check the user's choice
    //     if (userConfirmed) {
    //       this.router.navigate(['/student-register'])
    //     }
    //   }else if(decodedToken.authorities == "ROLE_STUDENT"){
    //     const course_id_pass = {
    //       "cid":id
    //     }
    //     this.router.navigate(['/payment'],{queryParams:course_id_pass})
    //   }
     
  
    // }else{
    //   let userConfirmed = window.confirm("Please Login first....");

    //   // Check the user's choice
    //   if (userConfirmed) {
    //     this.router.navigate(['/login'])
    //   }
    // }
  
  }
    

  

  add_to_cart(course_id: number) {
    // let user_data:any = localStorage.getItem("masaiclone-user-email");
    if(this.jwtToken != null){

      
      alert("later............");
      // user_data = JSON.parse(user_data);
      // if(user_data.username == null){
      //   let userConfirmed = window.confirm("Please Login first....");

      //   // Check the user's choice
      //   if (userConfirmed) {
      //     this.router.navigate(['/login'])
      //   }
      // }else{
      //   let arr:number[] = user_data["cart"];
      //   arr.push(course_id)
      //   let updated = JSON.stringify(user_data)
      //   localStorage.setItem("masaiclone-user-email",updated)   
  
      //   alert("Item Added Successfully")
      // }
     
  
    }else{
      let userConfirmed = window.confirm("Please Login first....");

      // Check the user's choice
      if (userConfirmed) {
        this.router.navigate(['/login'])
      }
    }
  
  }


}
