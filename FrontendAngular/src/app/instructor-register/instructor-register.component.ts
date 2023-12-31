import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { InstructorService } from '../services/instructor.service';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { DepartmentService } from '../services/department.service';

@Component({
  selector: 'app-instructor-register',
  templateUrl: './instructor-register.component.html',
  styleUrls: ['./instructor-register.component.css']
})
export class InstructorRegisterComponent implements OnInit{


  instructor_form:FormGroup
  all_instructor:any[] = []

  option_depart:any[] = []
  is_user:boolean = false

  is_updating:number = 0
  selected_depart_name:string = ''
  selected_depart:number = 0

  constructor(private fb:FormBuilder,private ins_ser:InstructorService
    ,private departSer:DepartmentService, private route:ActivatedRoute,private router:Router){
    this.instructor_form = this.fb.group({
      name:['',Validators.required],
      gender:['',Validators.required],
      dateOfBirth:['',Validators.required],
      email:['',Validators.required],
      contactNumber:['',Validators.required],
      password:['',Validators.required],
      experience:['',Validators.required],
      qualification:['',Validators.required],
      expertise:['',Validators.required],
      resume:[null],
      expectedSalary:[''],
      department:['',Validators.required]

    })
  }

instruc_regis() {
  if (this.instructor_form.valid) {
    const instructor = this.instructor_form.value;

    console.log(instructor+"          =========== INSTRUCTOR");

    // updating the instructor
    // console.log(this.is_updating)


    if(this.is_updating != undefined && this.is_updating != 0){

      this.ins_ser.updateInstructor(this.is_updating,instructor).subscribe((response)=>{
        console.log(response+"============================")
        alert("Instructor updated")
        this.getAllInstructor()
       
      })
    }else{
      this.ins_ser.createInstructor(instructor,this.selected_depart)
      .pipe(
        catchError((error) => {
          if (error.status === 400 && error.error) {
            // If the server returns a 400 Bad Request with error details
            console.error('Validation error:', error.error);

            // You can extract error messages related to specific fields here.
            const fieldErrors = error.error.fieldErrors;
            if (fieldErrors) {
              for (const field in fieldErrors) {
                if (fieldErrors.hasOwnProperty(field)) {
                  console.error(`Field: ${field}, Error: ${fieldErrors[field]}`);
                }
              }
            }

            // You can also throw a custom error or return a default value if needed.
            return throwError(error.error);
          } else {
            // Handle other types of errors here
            console.error('An unexpected error occurred:', error);
            return throwError('An unexpected error occurred.');
          }
        })
      )
      .subscribe((response) => {
        // Handle the response here
        alert("Instructor created sucessfully")
        // localStorage.setItem("who_is_login","instructor")
        // localStorage.setItem("instructor_data",JSON.stringify(response))
        console.log(response)
        // this.router.navigate(['instructor-dashboard'])
        this.getAllInstructor();
      });


    }


    // this.getAllInstructor()
   



  }else{
    alert("every field is required")
  }
}


  ngOnInit(): void {


    // this.route.queryParams.subscribe((param:any)=>{

    //   this.is_user = param.hero_ins
    // })

    // if(!this.is_user){
    //   this.getAllInstructor()
    // }

    this.getAllDepartment()
    this.getAllInstructor()

    
  }

  departmentSelect(event:any){
    this.selected_depart = event.target.value;
  }

  getAllInstructor(){
    this.ins_ser.getAllInstructor().subscribe((response:any)=>{
      this.all_instructor = response;
      console.log(response)
      
    })
  }

  getAllDepartment(){
    this.departSer.getAllDepartment().subscribe((response:any)=>{
      this.option_depart = response;
      
    })
  }
  edit_instruc(id:number){

    


    this.getDepartmentName(id)
    this.ins_ser.getSingleInstrcutor(id).subscribe((response)=>{
      this.is_updating = id
      
      this.instructor_form.patchValue(response)
    })



    

  }

  getDepartmentName(ins_id:number){

    this.ins_ser.getDepartmentByIns(ins_id).subscribe((response:any)=>{
      
      
      this.selected_depart_name = response.name
      
      this.instructor_form.get('department')?.setValue(response.id)
    })
 
  }

  delete_instruc(id:number){
    
    const is_agree = confirm("are you sure?")
    if(is_agree){
      this.ins_ser.deleteInstructor(id).subscribe((response)=>{
        alert("Instructor Deleted")
        this.getAllInstructor()
      })
    }
  }
}



