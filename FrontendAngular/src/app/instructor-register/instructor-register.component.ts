import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { InstructorService } from '../services/instructor.service';
import { catchError } from 'rxjs/operators';
import { partition, throwError } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { DepartmentService } from '../services/department.service';
import { jwtDecode } from 'jwt-decode';
import { UserAuthComponent } from '../user-auth/user-auth.component';
import { RegisterService } from '../services/register.service';
import { TokendataService } from '../services/tokendata.service';

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
  user_email:string =""
  is_updating:number = 0
  // selected_depart_name:string = ''
  selected_depart:number = 0;
  JWTtoken:any= localStorage.getItem("masaischoolclone");
  isAdmin:boolean = false

  constructor(private fb:FormBuilder,private ins_ser:InstructorService
    ,private departSer:DepartmentService, private route:ActivatedRoute,
    private router:Router,private userSer:RegisterService,private tokenSer:TokendataService){
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



  ngOnInit(): void {



    this.route.queryParams.subscribe((params)=>{

      this.is_updating = params["id"]

      if(this.is_updating != 0 && this.is_updating != undefined && this.JWTtoken){

        this.getInstructor(this.is_updating,this.JWTtoken);
      }
      // console.log(this.is_updating)
    })
  

    
    let current_user_id = localStorage.getItem("current_user_id");

    if(this.JWTtoken != null && current_user_id != null){


      const decodedToken = this.tokenSer.getUserDetailsFromToken(this.JWTtoken);
      if(decodedToken.authorities == "ROLE_ADMIN"){
        this.isAdmin = true;
      }
     
      this.userSer.getUserById(parseInt(current_user_id),this.JWTtoken).subscribe((response:any) =>{

        
         this.user_email = response.email;
      })

      this.getAllDepartment()
      if(this.isAdmin){
        this.getAllInstructor()
      }
      
     
     
    }else{
      alert("Please Login First...")
      this.router.navigate(['/login'])
    }


   

    
  }

  
instruc_regis() {
  if (this.instructor_form.valid) {
    const instructor = this.instructor_form.value;

    console.log(instructor);

   
    if(this.JWTtoken != null){
      if(this.is_updating != undefined && this.is_updating != 0){

        
        this.ins_ser.updateInstructor(this.is_updating,instructor,this.JWTtoken).subscribe((response)=>{
          
          alert("Instructor updated")
          if(this.isAdmin){
            this.getAllInstructor()
          }
         
        })
      }else{
  
        
        this.ins_ser.createInstructor(instructor,this.selected_depart,this.user_email,this.JWTtoken).subscribe(response=>{
  
          alert("Instructor created")
          if(this.isAdmin){
            this.getAllInstructor()
          }
        },error=>{
          console.log(error)
        })
        // this.ins_ser.createInstructor(instructor,this.selected_depart,this.user_email)
        // .pipe(
        //   catchError((error) => {
        //     if (error.status === 400 && error.error) {
        //       // If the server returns a 400 Bad Request with error details
        //       console.error('Validation error:', error.error);
  
        //       // You can extract error messages related to specific fields here.
        //       const fieldErrors = error.error.fieldErrors;
        //       if (fieldErrors) {
        //         for (const field in fieldErrors) {
        //           if (fieldErrors.hasOwnProperty(field)) {
        //             console.error(`Field: ${field}, Error: ${fieldErrors[field]}`);
        //           }
        //         }
        //       }
  
        //       // You can also throw a custom error or return a default value if needed.
        //       return throwError(error.error);
        //     } else {
        //       // Handle other types of errors here
        //       console.error('An unexpected error occurred:', error);
        //       return throwError('An unexpected error occurred.');
        //     }
        //   })
        // )
        // .subscribe((response) => {
        //   // Handle the response here
        //   alert("Instructor created sucessfully")
        //   // localStorage.setItem("who_is_login","instructor")
        //   // localStorage.setItem("instructor_data",JSON.stringify(response))
        //   console.log(response)
        //   // this.router.navigate(['instructor-dashboard'])
        //   this.getAllInstructor();
        // });
  
  
      }

      
    }else{
      this.router.navigate(['/login'])
    }


    // this.getAllInstructor()
   



  }else{
    alert("every field is required")
  }
}

getInstructor(insid:number,token:string){
  this.ins_ser.getSingleInstrcutor(insid,token).subscribe((response:any)=>{

    
    // console.log(response)
    this.instructor_form.patchValue(response)
   
  },(error)=>{
    console.log(error)
  })
}

  departmentSelect(event:any){
    this.selected_depart = event.target.value;
  }

  getAllInstructor(){
    this.ins_ser.getAllInstructor(this.JWTtoken).subscribe((response:any)=>{
      this.all_instructor = response;
      console.log(response)
      
    })
  }

  getAllDepartment(){
    this.departSer.getAllDepartment(this.JWTtoken).subscribe((response:any)=>{
      this.option_depart = response;
      
    })
  }
  edit_instruc(id:number){

  
    this.getDepartmentName(id)
    this.ins_ser.getSingleInstrcutor(id,this.JWTtoken).subscribe((response)=>{
      this.is_updating = id
      
      this.instructor_form.patchValue(response)
    })



    

  }

  getDepartmentName(ins_id:number){

    this.ins_ser.getDepartmentByIns(ins_id).subscribe((response:any)=>{
      
      // console.log(response);
      
      // this.selected_depart_name = response.name
      
      this.instructor_form.get('department')?.setValue(response.id)
    })
 
  }

  delete_instruc(id:number){
    
    const is_agree = confirm("Not Allowed for now")
    // if(is_agree){
    //   this.ins_ser.deleteInstructor(id,this.JWTtoken).subscribe((response)=>{
    //     alert("Instructor Deleted")
    //     this.getAllInstructor()
    //   })
    // }
  }
}



