import { Component } from '@angular/core';
import { StudentService } from '../services/student.service';
import { NavigationExtras, Router } from '@angular/router';
import { TokendataService } from '../services/tokendata.service';
import { InstructorService } from '../services/instructor.service';
import { Observable } from 'rxjs/internal/Observable';
import { MatDialog } from '@angular/material/dialog';
import { RatingDialogComponent } from '../rating-dialog/rating-dialog.component';
import { CourseService } from '../services/course.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css','../course-detail/course_detail.scss']
})
export class ProfileComponent {

  
  current_user :any;
  is_student:boolean = false
  stu_courses:any[] = [];
  tokenJWT:any = localStorage.getItem("masaischoolclone");
 
  constructor(private stuSer:StudentService,private router:Router,private tokenSer:TokendataService,
    private insSer:InstructorService,public dialog: MatDialog,private courSer:CourseService){

  }

  ngOnInit(){
    
    // ctokenJWT = localStorage.getItem("masaischoolclone");

    const current_user_id = localStorage.getItem("current_user_id")

    if(this.tokenJWT != null && current_user_id != null){

      const decoded = this.tokenSer.getUserDetailsFromToken(this.tokenJWT);
      if(decoded.authorities == "ROLE_STUDENT"){

        this.is_student = true;
        this.stuSer.fetchStuentByUserId(parseInt(current_user_id),this.tokenJWT).subscribe(response =>{

          this.current_user = response.body

          this.getCoursesOfStudent(this.current_user.id,this.tokenJWT);
         
        })
      }else if(decoded.authorities == "ROLE_INSTRUCTOR"){

        this.insSer.getInstructorByUserId(parseInt(current_user_id),this.tokenJWT).subscribe(response =>{

          this.current_user = response
         
        })
      }
      
    }

  }

  openRatingDialog(course_id:number): void {
    const dialogRef = this.dialog.open(RatingDialogComponent, {
      width: '250px', // adjust as needed
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        console.log(`User rated: ${result}`);
        // Handle the rating as needed
        this.rating(course_id,result,this.tokenJWT)
      } else {
        console.log('User canceled rating');
      }
    });
  }
   
  updateStudent(sid:number){

    const navigationExtras: NavigationExtras = {
      queryParams: {
        id: sid,
        // Add other parameters as needed
      },
    };

    if(this.is_student){
      this.router.navigate(['/student-register'],navigationExtras)
    }else{
      this.router.navigate(['/instruc-register'],navigationExtras)
    }
  
  }

  
  getCoursesOfStudent(id:number,token:string){

    
    this.stuSer.getCoursesOfStudent(id,token).subscribe((response:any)=>{

      // console.log(response);

      this.stu_courses  = response.body;
    })
  
  }

  rating(courseId:number,rating:number,token:string){

    this.courSer.rateTheCourse(courseId,rating,token).subscribe((response:any)=>{
     
      const mess = response.message;
      
      alert(mess.substring(1))
    },error=>{
      alert(error)
    })

   
  }

}
