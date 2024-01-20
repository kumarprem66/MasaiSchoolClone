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


  current_user:any
  user_email:string = ""

  constructor(private fb:FormBuilder,
    private regSer:RegisterService
    ,private router:Router,private route:ActivatedRoute,private stu_ser:StudentService){
    this.userData = this.fb.group({
      name : ['',Validators.required],
      dateOfBirth:['',Validators.required],
      contactNumber:['',Validators.required],
      gender: ['',Validators.required],


    })
  }
  ngOnInit(): void {
  

    const localUser = localStorage.getItem("current-user")
    if(localUser != null){
      const parseData = JSON.parse(localUser)
      
      this.current_user = Number(parseData.id)
    }
    let local_user:any = localStorage.getItem("masaiclone-user-email")
    if(local_user != null){
      local_user = JSON.parse(local_user);
      this.user_email = local_user.email;
      // this.getLoginUser(this.user_email)
     
    }

  }

  studentRegister2(){

    const stu_data = this.userData.value

    console.log(stu_data)

    this.regSer.getUserDetails(this.user_email).subscribe((response:any)=>{
      
      // this.current_user = response
      // stu_data.user = response
    //   console.log(response)
    //  console.log(typeof response)

     let my_user = {
      "uid": response.uid,
      "username": response.username,
      "email":response.email,
      "password":response.password

     }

     stu_data.user =  {
      uid: response.uid,
      username: response.username,
      email:response.email,
      password:response.password

     }

    //  console.log(user)

      // this.stu_ser.createStudent(stu_data).subscribe((response)=>{
      //   alert("sucess refresh the page once")
  
      //   console.log(response)
      //   // localStorage.setItem("can_purchase","yes")
      //   // localStorage.setItem("student_data",JSON.stringify(response))
      
      // },(error)=>{
        
      //   // alert("student already register")
      //   // this.updateStudent(this.current_user_id,stu_data)
  
      //   console.log(error)
      // })
    
    },(error)=>{
      console.log(error)
    })

   
  }

  studentRegister() {
    const stu_data = this.userData.value;

    

    this.stu_ser.createStudent(this.user_email,stu_data).subscribe(
      (createdStudent: any) => {
        alert('Student registered successfully. Refresh the page once.');
       
        localStorage.setItem('masaiclone-user-email', JSON.stringify(createdStudent));
        console.log(createdStudent)
      },
      (createError) => {
        // console.log('Error creating student:', createError);
        alert(createError.error)
      });
     
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


  getLoginUser(email:string){
    this.regSer.getUserDetails(email).subscribe((response:any)=>{

      // let user = JSON.parse(response)
      // console.log(response)
      return response
    },(error)=>{
      console.log(error)
    })
  }
}

