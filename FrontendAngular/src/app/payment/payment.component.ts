import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { StudentService } from '../services/student.service';
import { RegisterService } from '../services/register.service';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent implements OnInit{

  course_id:number = 0
  student_id:number = 0
  jwttoken:any = localStorage.getItem("masaischoolclone")
  
  constructor(private route:ActivatedRoute,private router:Router,private stu_ser:StudentService){

    

  }
  ngOnInit(): void {
    
    this.route.queryParams.subscribe((param:any)=>{

    
      this.course_id = param.cid
      this.student_id = param.sid;
    })

   


  }

  purchase_confirm(){

   
    if(this.course_id != 0 && this.jwttoken != null && this.student_id != 0){
      
      this.stu_ser.addCourseToStudent(this.student_id,this.course_id,this.jwttoken).subscribe((response:any)=>{
        alert(response.message)
       
        this.router.navigate(['/courses-all'])
      },(error)=>{
        alert(error.error.error)
        this.router.navigate(['/courses-all'])
        // console.log(error)
      }
      )

     
     
    }
    else{
      alert("you are not a student  or course_id is not valid")
      this.router.navigate(['student-register'])
    }
   

  }


 
}
