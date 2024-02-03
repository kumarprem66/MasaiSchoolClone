import { Component, OnInit } from '@angular/core';
import { CourseService } from '../services/course.service';
import { FormBuilder, FormGroup, Validators,FormsModule } from '@angular/forms';
import { InstructorService } from '../services/instructor.service';
import { DepartmentService } from '../services/department.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CategoryService } from '../services/category.service';

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
  image_url:string = '';
  isAvailable:boolean = false;
  Instructor:number = 0;
  department:number = 0;
  category:number = 0;
  description:string = '';
  course_price:number = 0;
  student_enrolled:number = 10;
  rating_count:number = 20;
  course_language = ''

  selectedFile: File | null = null

  current_id:number = 0

  intruc_options:any[] = []
  depart_options:any[] = []
  cate_options:any[] = []

  // department_id:number = 2;
  selected_dep:number = 0;
  selected_cat:number = 0;
  selected_ins:number = 0;

  JWTtoken:any= localStorage.getItem("masaischoolclone");
  

  constructor(private courseService:CourseService,private fb:FormBuilder,private insSer:InstructorService,
    private depSer:DepartmentService,private catSer:CategoryService, private route:ActivatedRoute,private router:Router){
    this.courseForm = this.fb.group({

      courseCode :['',Validators.required],
      courseName :['',Validators.required],
      duration :['',Validators.required],
      rating :[0],
      image :['',Validators.required],
      isAvailable :[false,Validators.required],
      category : ['',Validators.required],
      Instructor : ['',Validators.required],
      department : ['',Validators.required],
      description : [''],
      coursePrice : ['',Validators.required],
      studentEnrolled : [0],
      ratingCount: [0],
      courseLanguage: ['',Validators.required],

    });

   
  }

  ngOnInit(): void {
    
   if(this.JWTtoken != null){
    this.getCategoryName()
    this.getAllInstructorName(this.JWTtoken)
    this.getDepartmentName(this.JWTtoken)

    this.route.queryParams.subscribe((param:any)=>{
      this.current_id = param.course_id;

      // console.log(this.current_id)
      if(this.current_id != 0 && this.current_id != undefined){
       
        this.getCourseFromId(this.current_id)
      }
    })
   }else{
    alert("Please Login First...")
    this.router.navigate(['/login'])
  }
  
    
  }


  getCourseFromId(id:number){
    this.courseService.getCourseById(id).subscribe((response)=>{

      // console.log(response)
      this.getCategoryFromCourse(id);
      this.getDepartFromCourse(id);
      this.getInstructorFromCourse(id);
      this.courseForm.patchValue(response)
    })
  }

  getDepartFromCourse(course_id:number){

    this.courseService.getCourseDepartment(course_id).subscribe((response:any)=>{
      // console.log(response);

      this.courseForm.get('department')?.setValue(response.id)
    })
  }

  getCategoryFromCourse(course_id:number){
    this.courseService.getCourseCategory(course_id).subscribe((response:any)=>{
      // console.log(response);
      this.courseForm.get('category')?.setValue(response.cid)
    })
  }


  getInstructorFromCourse(course_id:number){
    this.courseService.getCourseInstructor(course_id).subscribe((response:any)=>{
      // console.log(response);
      this.courseForm.get('Instructor')?.setValue(response.id)
    })
  }




  getInstructorName(depart_id:number){
    this.intruc_options = []
    this.insSer.getInstructorByDepart(depart_id).subscribe((response : any)=>{
      const instructors = response
      console.log(instructors)

      instructors.forEach((element:any) => {
        
        // console.log(element.id)
        // console.log(element.name)
       
        this.intruc_options.push({value:element.id,text:element.name+",("+element.expertise+"), ("+element.qualification+")"})

      });
    })

  }
  getCategoryName(){

    this.catSer.getCategories().subscribe((response: any)=>{
      const categories = response
      // console.log(categories)

      categories.forEach((element:any) => {
        this.cate_options.push({value:element.cid,text:element.name})
      })
    })
    
  }
  selectedDepart(event:any){
    this.selected_dep = Number(event.target.value);
    this.getInstructorName(Number(event.target.value));
    // console.log(this.selected_dep);

  }

  selectedInstr(event:any){
    this.selected_ins = Number(event.target.value);

    console.log(this.selected_ins);
  }
  selectedCategory(event:any){
    this.selected_cat = Number(event.target.value);
    console.log(this.selected_cat);

  }
  getAllInstructorName(token :string){
    this.insSer.getAllInstructor(token).subscribe((response : any)=>{
      const instructors = response
      console.log(instructors)

      instructors.forEach((element:any) => {
        
        // console.log(element.id)
        // console.log(element.name)
       
        this.intruc_options.push({value:element.id,text:element.name+",("+element.expertise+"), ("+element.qualification+")"})

      });
    })

  }
  getDepartmentName(token:string){

    this.depSer.getAllDepartment(token).subscribe((response : any)=>{
      const departments = response
      // console.log(departments)
      departments.forEach((element:any) => {
        
        // console.log(element.id)
        // console.log(element.name)
        
        this.depart_options.push({value:element.id,text:element.name})

      });
    })

  }

  updateCourse(id:number,data:any,token:string){

    //  console.log(data.image)
    //  data.image = null
    //  console.log(data)
    this.courseService.updateCourseById(id,data,token).subscribe((response)=>{
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
        this.updateCourse(this.current_id,courseData,this.JWTtoken)
      }else{


        console.log(courseData)
        this.courseService.createCourse(this.selected_dep,this.selected_ins,this.selected_cat,courseData,this.JWTtoken).subscribe((response)=>{
          console.log('Course created successfully:',response)
          alert("Course created successfully")
        },(error)=>{
          alert(error)
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
