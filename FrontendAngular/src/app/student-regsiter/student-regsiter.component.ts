import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { RegisterService } from '../services/register.service';
import { StudentService } from '../services/student.service';

@Component({
  selector: 'app-student-regsiter',
  templateUrl: './student-regsiter.component.html',
  styleUrls: ['./student-regsiter.component.css']
})
export class StudentRegsiterComponent implements OnInit {
  userData:FormGroup


  current_user_id:number = 0

  constructor(private fb:FormBuilder,
    private regSer:RegisterService
    ,private router:Router,private route:ActivatedRoute,private stu_ser:StudentService){
    this.userData = this.fb.group({
      name : ['',Validators.required],
      date_of_birth:['',Validators.required],
      contact_number:['',Validators.required],
      gender: ['',Validators.required],


    })
  }
  ngOnInit(): void {
  

    const localUser = localStorage.getItem("current-user")
    if(localUser != null){
      const parseData = JSON.parse(localUser)
      
      this.current_user_id = Number(parseData.id)
    }

  }

  studentRegister(){

    const stu_data = this.userData.value
    stu_data.user = this.current_user_id


    console.log(stu_data)

    this.stu_ser.createStudent(stu_data).subscribe((response)=>{
      alert("sucess refresh the page once")

      console.log(response)
      localStorage.setItem("can_purchase","yes")
      localStorage.setItem("student_data",JSON.stringify(response))
     
    },(error)=>{
      
      alert("student already register")
      this.updateStudent(this.current_user_id,stu_data)
    })
   
  }


  // getALLStudent(){
  //   this.regSer.allUsers().subscribe((respnse)=>{
  //     console.log(respnse)
  //   })
  // }

  updateStudent(id:number,data:any){
    this.stu_ser.updateStudent(id,data).subscribe((response)=>{
      alert("updated")
    })
  }


}

