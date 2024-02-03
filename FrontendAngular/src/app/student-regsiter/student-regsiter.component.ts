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


  current_student_id:number = 0
  user_email:string = ""

  tokenJWT = localStorage.getItem("masaischoolclone")
  current_user_id = localStorage.getItem("current_user_id")


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
  
    
    this.route.queryParams.subscribe((param)=>{

      this.current_student_id = param["id"]
      // console.log(this.current_user_id);
      if(this.tokenJWT != null){
        this.getSingleStudent(this.current_student_id,this.tokenJWT)
      }
      
    })
    

  }

  // studentRegister2(){

  //   const stu_data = this.userData.value

  //   console.log(stu_data)

  //   this.regSer.getUserDetails(this.user_email).subscribe((response:any)=>{
      
  //     // this.current_user = response
  //     // stu_data.user = response
  //   //   console.log(response)
  //   //  console.log(typeof response)

  //    let my_user = {
  //     "uid": response.uid,
  //     "username": response.username,
  //     "email":response.email,
  //     "password":response.password

  //    }

  //    stu_data.user =  {
  //     uid: response.uid,
  //     username: response.username,
  //     email:response.email,
  //     password:response.password

  //    }

  //   //  console.log(user)

  //     // this.stu_ser.createStudent(stu_data).subscribe((response)=>{
  //     //   alert("sucess refresh the page once")
  
  //     //   console.log(response)
  //     //   // localStorage.setItem("can_purchase","yes")
  //     //   // localStorage.setItem("student_data",JSON.stringify(response))
      
  //     // },(error)=>{
        
  //     //   // alert("student already register")
  //     //   // this.updateStudent(this.current_user_id,stu_data)
  
  //     //   console.log(error)
  //     // })
    
  //   },(error)=>{
  //     console.log(error)
  //   })

   
  // }

  studentRegister() {
    const stu_data = this.userData.value;

  
    if(this.userData.valid){


      if(this.tokenJWT != null && this.current_user_id != null){
 
        if(this.current_student_id == 0){
  
  
          this.stu_ser.createStudent(this.user_email,stu_data).subscribe(
            (createdStudent: any) => {
              alert('Student registered successfully. Refresh the page once.');
             
             
            },
            (createError) => {
             
              alert(createError.error)
            });
        }else{

          this.updateStudent(this.current_student_id,parseInt(this.current_user_id),stu_data,this.tokenJWT)
        }
      }else{
        alert("first register as a user")
      }
  
    }else{

      alert("Every field is required")
    }
  
   
     
  }


  // getALLStudent(){
  //   this.regSer.allUsers().subscribe((respnse)=>{
  //     console.log(respnse)
  //   })
  // }

  updateStudent(sid:number,uid:number,data:any,token:string){
    this.stu_ser.updateStudent(sid,uid,data,token).subscribe((response)=>{
      alert("updated")

      this.router.navigate(['/profile'])
    })
  }


  // getLoginUser(email:string){
  //   this.regSer.getUserDetails(email).subscribe((response:any)=>{

  //     // let user = JSON.parse(response)
  //     // console.log(response)
  //     return response
  //   },(error)=>{
  //     console.log(error)
  //   })
  // }

  getSingleStudent(sid:number,token:string){
    this.stu_ser.getSingleStudent(sid,token).subscribe((response:any)=>{

      
      this.userData.patchValue(response.body)
     
    },(error)=>{
      console.log(error)
    })
  }
}

