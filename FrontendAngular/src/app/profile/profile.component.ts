import { Component } from '@angular/core';
import { StudentService } from '../services/student.service';
import { NavigationExtras, Router } from '@angular/router';
import { TokendataService } from '../services/tokendata.service';
import { InstructorService } from '../services/instructor.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent {

  
  current_user :any;
  is_student:boolean = false
 
  constructor(private stuSer:StudentService,private router:Router,private tokenSer:TokendataService,
    private insSer:InstructorService){

  }

  ngOnInit(){
    
    const tokenJWT = localStorage.getItem("masaischoolclone");

    const current_user_id = localStorage.getItem("current_user_id")

    if(tokenJWT != null && current_user_id != null){

      const decoded = this.tokenSer.getUserDetailsFromToken(tokenJWT);
      if(decoded.authorities == "ROLE_STUDENT"){

        this.is_student = true;
        this.stuSer.fetchStuentByUserId(parseInt(current_user_id),tokenJWT).subscribe(response =>{

          this.current_user = response.body
         
        })
      }else if(decoded.authorities == "ROLE_INSTRUCTOR"){

        this.insSer.getInstructorByUserId(parseInt(current_user_id),tokenJWT).subscribe(response =>{

          this.current_user = response
         
        })
      }
      
    }

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

}
