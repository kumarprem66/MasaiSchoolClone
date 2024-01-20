import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { StudentService } from '../services/student.service';

@Component({
  selector: 'app-student-login',
  templateUrl: './student-login.component.html',
  styleUrls: ['./student-login.component.css']
})
export class StudentLoginComponent {

  studentForm:FormGroup



  constructor(private fb:FormBuilder,private router:Router,private stu_ser:StudentService){
    this.studentForm = this.fb.group({
      stu_mob : ['',Validators.required]
    })
  }


  studentSubmit() {
  
    const numb = this.studentForm.value
    console.log(numb.stu_mob);

    this.stu_ser.loginStudent(numb.stu_mob).subscribe(response =>{

      
      localStorage.setItem('masaiclone-user-email', JSON.stringify(response));
      alert("Successfully login as a Student")

      this.router.navigate(['/student_dashboard'])

      
    },error=>{
      alert(error.error)
     
    })

  }

}
