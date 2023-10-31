import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { StudentService } from '../services/student.service';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent implements OnInit{

  course_id:number = 0
  constructor(private route:ActivatedRoute,private router:Router,private stu_ser:StudentService){


  }
  ngOnInit(): void {
    
    this.route.queryParams.subscribe((param:any)=>{

      console.log(param.course_id)
      this.course_id = param.course_id
    })

  }

  purchase_confirm(){

    const student_data = localStorage.getItem("student_data")
    if(student_data != null){
      const parse_student = JSON.parse(student_data)
      let stu_id  = parse_student.id

      
      this.stu_ser.addCourseToStudent(stu_id,this.course_id).subscribe((response)=>{
        alert("success")
        localStorage.setItem("who_is_login","student")
        // localStorage.setItem("student_data",JSON.stringify())
        console.log(response)
      },(error)=>{
        alert(error.error.error)
      }
      )




     
    }else{
      alert("you are not logged in")
      this.router.navigate(['student-register'])
    }
   

  }
}
