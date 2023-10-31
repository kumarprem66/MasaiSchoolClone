import { Component, OnInit } from '@angular/core';
import { CourseService } from '../services/course.service';
import { FormBuilder, FormGroup, Validators,FormsModule } from '@angular/forms';
import { InstructorService } from '../services/instructor.service';
import { DepartmentService } from '../services/department.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-add-course',
  templateUrl: './add-course.component.html',
  styleUrls: ['./add-course.component.css']
})
export class AddCourseComponent implements OnInit{

  courseForm: FormGroup;

  course_code:string = '';
  course_name:string = '';
  duration:string = '';
  rating:number = 0;
  image:string = '';
  is_available:boolean = false;
  Instructor:number = 0;
  department:number = 0;
  description:string = '';
  course_price:number = 0;
  student_enrolled:number = 10;
  rating_count:number = 20;
  course_language = ''

  selectedFile: File | null = null

  current_id:number = 0

  intruc_options:any[] = []
  depart_options:any[] = []

  

  constructor(private courseService:CourseService,private fb:FormBuilder,private insSer:InstructorService,
    private depSer:DepartmentService,private route:ActivatedRoute){
    this.courseForm = this.fb.group({

      course_code :['',Validators.required],
      course_name :['',Validators.required],
      duration :['',Validators.required],
      rating :['',Validators.required],
      image :[null],
      is_available :[false,Validators.required],
      Instructor : ['',Validators.required],
      department : ['',Validators.required],
      description : [''],
      course_price : ['',Validators.required],
      student_enrolled : ['',Validators.required],
      rating_count: ['',Validators.required],
      course_language: ['',Validators.required],

    });

   
  }

  ngOnInit(): void {
    
    this.getInstructorName()
    this.getDepartmentName()

    this.route.queryParams.subscribe((param:any)=>{
      this.current_id = param.course_id;

      // console.log(this.current_id)
      if(this.current_id != 0 && this.current_id != undefined){
       
        this.getCourseFromId(this.current_id)
      }
    })
  
    
  }


  getCourseFromId(id:number){
    this.courseService.getCourseById(id).subscribe((response)=>{

      console.log(response)
      this.courseForm.patchValue(response)
    })
  }
  getInstructorName(){
    this.insSer.getAllInstructor().subscribe((response : any)=>{
      const instructors = response.results
      // console.log(instructors)

      instructors.forEach((element:any) => {
        
        // console.log(element.id)
        // console.log(element.name)
       
        this.intruc_options.push({value:element.id,text:element.name})

      });
    })

  }
  getDepartmentName(){

    this.depSer.getAllDepartment().subscribe((response : any)=>{
      const departments = response.results
      // console.log(departments)
      departments.forEach((element:any) => {
        
        // console.log(element.id)
        // console.log(element.name)
        
        this.depart_options.push({value:element.id,text:element.name})

      });
    })

  }

  updateCourse(id:number,data:any){

    //  console.log(data.image)
    //  data.image = null
    //  console.log(data)
    this.courseService.updateCourseById(id,data).subscribe((response)=>{
      console.log('Course updated successfully:')
      alert("Course updated successfully")
      console.log(response)
    },(error)=>{
      alert("every field is required ")
    })

  
  }

  onSubmit(){
    if(this.courseForm.valid){
      const courseData = this.courseForm.value;

      if(this.current_id != 0 && this.current_id != undefined){
        this.updateCourse(this.current_id,courseData)
      }else{

        this.courseService.createCourse(courseData).subscribe((response)=>{
          console.log('Course created successfully:',response)
          alert("Course created successfully")
        },(error)=>{
          alert("Every field is required")
        });
      }

      // console.log(courseData)
    }else{

      // if (this.courseForm.controls['course_code'].hasError('required')) {
      //   alert("Course Code is required");
      // }
      // if (this.courseForm.controls['course_name'].hasError('required')) {
      //   alert("Course Name is required");
      // }
      // if (this.courseForm.controls['duration'].hasError('required')) {
      //   alert("Course Duration is required");
      // }
      // if (this.courseForm.controls['rating'].hasError('required')) {
      //   alert("Rating is required");
      // }
      // if (this.courseForm.controls['Instructor'].hasError('required')) {
      //   alert("Instructor ID is required");
      // }
      // if (this.courseForm.controls['department'].hasError('required')) {
      //   alert("Department ID is required");
      // }
      // if (this.courseForm.controls['is_available'].hasError('required')) {
      //   alert("Is Available is required");
      // }
  
      alert("Form submission failed. Please check the form for errors.");
    }
  }

  onFileSelected(event: any) {
    const files: FileList = event.target.files;

    if(files.length > 0){
      this.selectedFile = files[0];
    }else{
      this.selectedFile = null;
    }
   
    // this.courseForm.get('image')?.setValue(file);
    
  }
  
  // // With these additional alerts, you can pinpoint which field is causing the form validation to fail and take appropriate action to address it. Once you identify the issue, you can either provide a valid value for the required field or adjust the validation rules in your form.
  
}
