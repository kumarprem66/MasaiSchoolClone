import { Component } from '@angular/core';
import { NavigationExtras, Route, Router } from '@angular/router';
import { CommonService } from '../common.service';
import { StudentService } from '../services/student.service';
import { jwtDecode } from 'jwt-decode';
import { Observable, forkJoin, map, switchMap, tap } from 'rxjs';
import { AssignmentService } from '../services/assignment.service';

@Component({
  selector: 'app-assignment-header',
  templateUrl: './assignment-header.component.html',
  styleUrls: ['./assignment-header.component.css']
})
export class AssignmentHeaderComponent {

  all_assignment :any[] = []
  option_courses:any[]= []
  current_stu_id:number = 0;
  
  JWTtoken:any = localStorage.getItem("masaischoolclone")
  current_user_id:any = localStorage.getItem("current_user_id")
  constructor(private router:Router,private common:CommonService,private stuSer:StudentService,private assSer:AssignmentService){

  }
  ngOnInit(){

    
    // console.log(this.userId)
   
    if(this.JWTtoken != null && this.current_user_id != null){

      // this.getCoursesOfStudent(parseInt(userId),this.JWTtoken)
     this.getAllAssignmentOfStudentt(parseInt(this.current_user_id),this.JWTtoken)
    // console.log("what happened")
      
  
    }else{
      this.router.navigate(['/login'])
    }

  }

  assignmentDetails(anId:number){

    const navigationExtras: NavigationExtras = {
      queryParams: {
        aid: anId,
        sid:this.current_stu_id
        
      },
    };
  
    this.router.navigate(['/assignment-detail'],navigationExtras)
  }

  getAllAssignmentOfStudentt(userId:number,token:string){

    this.getALLAssignmentOfStudent(userId,token).subscribe((response:any) => {
   
        this.all_assignment= response;
        console.log(response);
      
    },error=>{
      console.log("something went wrong...")
    })

   


  }

  getALLAssignmentOfStudent(userId: number, token: string): Observable<any[]> {
    return this.getStudentByUserId(userId, token);
  }

  // getCoursesOfStudent(id:number,token:string){

  //   this.all_assignment = []
   
  //   this.stuSer.getCoursesOfStudent(id,token).subscribe((response:any)=>{

  //     console.log(response);
  //   },error=>{
  //     console.log(error)
  //   })
  // }
    
  getCoursesOfStudent(stuId: number, token: string): Observable<number[]> {
 
  
    // console.log(id)
    this.current_stu_id = stuId;
    return this.stuSer.getCoursesOfStudent(stuId, token).pipe(
      map((response: any) => {
   
        let courses: number[] = [];
        if (response.body.length > 0) {
          this.option_courses = response.body;
          courses = response.body.map((element: any) => element.id);
        }
        return courses;
      })
    );
  }
  
  getStudentByUserId(userId: number, token: string): Observable<any[]> {
    return this.stuSer.fetchStuentByUserId(userId, token).pipe(
      switchMap((response: any) => {
        const courseIds: number = response.body.id;
  
        return this.getCoursesOfStudent(courseIds, token).pipe(
          switchMap((courses: number[]) => {
            const assignList: any[] = [];
  
            const assignmentObservables = courses.map(element => {
            
              return this.assSer.getAllAssignment(userId,element, token);
            });
  
            return forkJoin(assignmentObservables).pipe(
              tap((responses: any) => {
                responses.forEach((response: any) => {
                  assignList.push(...response);
                });
              }),
              map(() => assignList)
            );
          })
        );
      })
    );
  }
  

  onCourseSelected(event:any){
   
    this.all_assignment = []
    const selected_course = event.target.value;
   
    this.assSer.getAllAssignment(this.current_user_id,selected_course,this.JWTtoken).subscribe((response:any)=>{
      this.all_assignment = response;
    },error=>{
      console.log("error occurred while fetching the assignment")
    })
    
  }
}
